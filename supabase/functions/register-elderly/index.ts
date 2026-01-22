import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

// Validation helpers
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9\-\+\s\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 9 && phone.length <= 20;
};

const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 500); // Max length
};

interface RegistrationData {
  first_name: string;
  last_name: string;
  birth_date?: string;
  address?: string;
  email?: string;
  phone?: string;
  origin: "sephardic" | "ashkenazi";
  gender: "male" | "female";
  create_account?: boolean;
  password?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting (hash it for privacy)
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const ipHash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(clientIp + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))
    ).then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join(""));

    // Check rate limit
    const now = new Date();
    const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);

    const { data: rateData } = await supabase
      .from("registration_rate_limit")
      .select("*")
      .eq("ip_hash", ipHash)
      .single();

    if (rateData) {
      const windowStartTime = new Date(rateData.window_start);
      if (windowStartTime > windowStart) {
        // Still in the same window
        if (rateData.request_count >= MAX_REQUESTS_PER_WINDOW) {
          console.log(`Rate limit exceeded for IP hash: ${ipHash.substring(0, 8)}...`);
          return new Response(
            JSON.stringify({ error: "Too many registration attempts. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        // Increment counter
        await supabase
          .from("registration_rate_limit")
          .update({ request_count: rateData.request_count + 1 })
          .eq("ip_hash", ipHash);
      } else {
        // Reset window
        await supabase
          .from("registration_rate_limit")
          .update({ request_count: 1, window_start: now.toISOString() })
          .eq("ip_hash", ipHash);
      }
    } else {
      // Create new rate limit entry
      await supabase
        .from("registration_rate_limit")
        .insert({ ip_hash: ipHash, request_count: 1, window_start: now.toISOString() });
    }

    // Parse and validate request body
    const body: RegistrationData = await req.json();
    console.log("Registration request received");

    // Validate required fields
    if (!body.first_name || typeof body.first_name !== "string") {
      return new Response(
        JSON.stringify({ error: "First name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!body.last_name || typeof body.last_name !== "string") {
      return new Response(
        JSON.stringify({ error: "Last name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["sephardic", "ashkenazi"].includes(body.origin)) {
      return new Response(
        JSON.stringify({ error: "Invalid origin selection" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["male", "female"].includes(body.gender)) {
      return new Response(
        JSON.stringify({ error: "Invalid gender selection" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate optional fields
    if (body.email && !validateEmail(body.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.phone && !validatePhone(body.phone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate account creation fields
    if (body.create_account) {
      if (!body.email) {
        return new Response(
          JSON.stringify({ error: "Email is required for account creation" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!body.password || body.password.length < 6) {
        return new Response(
          JSON.stringify({ error: "Password must be at least 6 characters" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Sanitize inputs
    const sanitizedData = {
      first_name: sanitizeString(body.first_name).substring(0, 100),
      last_name: sanitizeString(body.last_name).substring(0, 100),
      birth_date: body.birth_date || null,
      address: body.address ? sanitizeString(body.address) : null,
      email: body.email?.trim().toLowerCase() || null,
      phone: body.phone?.trim() || null,
      origin: body.origin,
      gender: body.gender,
      status: "pending",
    };

    let userId: string | null = null;

    // Create account if requested
    if (body.create_account && body.email && body.password) {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true,
      });

      if (authError) {
        console.error("Auth error:", authError.message);
        if (authError.message.includes("already registered")) {
          return new Response(
            JSON.stringify({ error: "This email is already registered" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        return new Response(
          JSON.stringify({ error: "Failed to create account" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      userId = authData.user?.id || null;
      console.log("User account created:", userId);
    }

    // Insert elderly record
    const { data: elderlyData, error: insertError } = await supabase
      .from("elderly")
      .insert(sanitizedData)
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError.message);
      
      // If account was created but insert failed, we should clean up
      if (userId) {
        await supabase.auth.admin.deleteUser(userId);
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to register. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Registration successful:", elderlyData.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Registration successful",
        id: elderlyData.id,
        accountCreated: !!userId 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
