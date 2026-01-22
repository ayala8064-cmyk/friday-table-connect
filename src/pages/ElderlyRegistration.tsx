import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AddressAutocomplete from "@/components/forms/AddressAutocomplete";
import { Heart, User, MapPin, Calendar, Utensils, ArrowRight, Phone, Mail, Lock, Eye, EyeOff } from "lucide-react";

type Origin = "sephardic" | "ashkenazi";
type Gender = "male" | "female";

const ElderlyRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wantAccount, setWantAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    origin: "" as Origin | "",
    gender: "" as Gender | "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: "שגיאה",
        description: "נא למלא שם פרטי ושם משפחה",
        variant: "destructive",
      });
      return;
    }

    if (!formData.gender) {
      toast({
        title: "שגיאה",
        description: "נא לבחור גבר או אישה",
        variant: "destructive",
      });
      return;
    }

    if (!formData.origin) {
      toast({
        title: "שגיאה",
        description: "נא לבחור מוצא - חריימה או געפילטע 😄",
        variant: "destructive",
      });
      return;
    }

    // Validate email if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "שגיאה",
        description: "כתובת אימייל לא תקינה",
        variant: "destructive",
      });
      return;
    }

    // Validate phone if provided (Israeli format)
    if (formData.phone && !/^0[0-9]{8,9}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      toast({
        title: "שגיאה",
        description: "מספר טלפון לא תקין (למשל: 0501234567)",
        variant: "destructive",
      });
      return;
    }

    // Validate password if wants account
    if (wantAccount) {
      if (!formData.email) {
        toast({
          title: "שגיאה",
          description: "נא להזין אימייל כדי לפתוח חשבון",
          variant: "destructive",
        });
        return;
      }
      if (formData.password.length < 6) {
        toast({
          title: "שגיאה",
          description: "הסיסמה חייבת להכיל לפחות 6 תווים",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Use Edge Function for secure server-side validation and rate limiting
      const { data, error } = await supabase.functions.invoke('register-elderly', {
        body: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          birth_date: formData.birthDate || null,
          address: formData.address.trim() || null,
          origin: formData.origin,
          gender: formData.gender,
          phone: formData.phone.trim() || null,
          email: formData.email.trim() || null,
          create_account: wantAccount,
          password: wantAccount ? formData.password : null,
        },
      });

      if (error) {
        throw new Error(error.message || 'Registration failed');
      }

      if (data?.error) {
        // Handle specific error messages from the Edge Function
        if (data.error.includes('email') && data.error.includes('registered')) {
          toast({
            title: "שגיאה",
            description: "כתובת האימייל הזו כבר רשומה במערכת",
            variant: "destructive",
          });
        } else if (data.error.includes('Too many')) {
          toast({
            title: "שגיאה",
            description: "יותר מדי ניסיונות הרשמה. נסו שוב מאוחר יותר.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "שגיאה",
            description: data.error,
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }

      toast({
        title: wantAccount ? "נרשמת והחשבון נפתח בהצלחה! 🎉" : "נרשמת בהצלחה! 🎉",
        description: "בקרוב ניצור איתך קשר ונמצא לך משפחה מארחת לסעודת שבת",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "שגיאה בהרשמה",
        description: "משהו השתבש, נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-warm-lg border-accent/20">
              <CardHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Heart className="w-10 h-10 text-accent" />
                </motion.div>
                <CardTitle className="text-3xl text-primary">
                  הצטרפו למשפחת קשישי-שבת! 🎉
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  מלאו את הפרטים ונמצא לכם משפחה חמה לסעודות שבת
                  <br />
                  <span className="text-accent font-medium">השבת שלכם עומדת להיות הרבה יותר שמחה!</span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        שם פרטי *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="למשל: משה"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="text-right"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        שם משפחה *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="למשל: כהן"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="text-right"
                        required
                      />
                    </div>
                  </div>

                  {/* Birth Date - Optional */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      תאריך לידה (אופציונלי)
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground">
                      לא חובה, אבל זה עוזר לנו להתאים משפחות 👴👵
                    </p>
                  </div>

                  {/* Address with Autocomplete */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      כתובת מגורים
                    </Label>
                    <AddressAutocomplete
                      value={formData.address}
                      onChange={(address) => setFormData({ ...formData, address })}
                      placeholder="התחילו להקליד את הכתובת..."
                    />
                    <p className="text-xs text-muted-foreground">
                      ככה נמצא לכם משפחה קרובה מהשכונה 🏠
                    </p>
                  </div>

                  {/* Phone - Optional */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      טלפון (אופציונלי)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="למשל: 050-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="text-right"
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground">
                      כדי שנוכל ליצור קשר ולתאם את הסעודות 📞
                    </p>
                  </div>

                  {/* Email - Optional */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      אימייל (אופציונלי)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-right"
                      dir="ltr"
                    />
                  </div>

                  {/* Create Account Option */}
                  <div className="space-y-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="wantAccount"
                        checked={wantAccount}
                        onCheckedChange={(checked) => setWantAccount(checked === true)}
                      />
                      <Label htmlFor="wantAccount" className="cursor-pointer flex items-center gap-2">
                        <Lock className="w-4 h-4 text-accent" />
                        אני רוצה לפתוח חשבון באתר
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground mr-6">
                      עם חשבון תוכלו לעקוב אחרי הסעודות שלכם ולראות פרטי המשפחות המארחות 🏠
                    </p>

                    <AnimatePresence initial={false}>
                      {wantAccount && (
                        <motion.div
                          key="password-field"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: "auto",
                            transition: {
                              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.25, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: {
                              height: { duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.05 },
                              opacity: { duration: 0.15 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                              <Lock className="w-4 h-4 text-primary" />
                              סיסמה *
                            </Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="לפחות 6 תווים"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="text-right pr-10"
                                dir="ltr"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {!formData.email && (
                              <p className="text-xs text-destructive">
                                נא להזין אימייל למעלה כדי לפתוח חשבון
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Gender Selection */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      גבר או אישה? *
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, gender: "male" })}
                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                          formData.gender === "male"
                            ? "border-primary bg-primary/10 shadow-warm"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-5xl">👴</span>
                        <span className="font-medium text-primary">גבר</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, gender: "female" })}
                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                          formData.gender === "female"
                            ? "border-primary bg-primary/10 shadow-warm"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-5xl">👵</span>
                        <span className="font-medium text-primary">אישה</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Origin Selection - The Fun Part! */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-primary" />
                      מוצא (השאלה החשובה באמת 😄) *
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, origin: "sephardic" })}
                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                          formData.origin === "sephardic"
                            ? "border-accent bg-accent/10 shadow-warm"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <span className="text-4xl">🍲</span>
                        <span className="font-bold text-accent text-lg">חריימה!</span>
                        <span className="text-xs text-muted-foreground">ספרדי/מזרחי</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, origin: "ashkenazi" })}
                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                          formData.origin === "ashkenazi"
                            ? "border-accent bg-accent/10 shadow-warm"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <span className="text-4xl">🐟</span>
                        <span className="font-bold text-accent text-lg">געפילטע!</span>
                        <span className="text-xs text-muted-foreground">אשכנזי</span>
                      </motion.button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      אל דאגה, אנחנו אוהבים את כולם! זה רק עוזר לנו להתאים 🤗
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      type="submit"
                      variant="accent"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "שולח..."
                      ) : (
                        <>
                          הירשמו עכשיו - בחינם!
                          <ArrowRight className="w-5 h-5 mr-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-muted-foreground">
                    <Heart className="w-4 h-4 inline-block ml-1 text-accent" />
                    הפרטים שלכם שמורים אצלנו בבטחה
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElderlyRegistration;
