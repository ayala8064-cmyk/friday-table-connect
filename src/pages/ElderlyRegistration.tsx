import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AddressAutocomplete from "@/components/forms/AddressAutocomplete";
import { Heart, User, MapPin, Calendar, Utensils, ArrowRight } from "lucide-react";

type Origin = "sephardic" | "ashkenazi";
type Gender = "male" | "female";

const ElderlyRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    origin: "" as Origin | "",
    gender: "" as Gender | "",
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("elderly" as any).insert({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        birth_date: formData.birthDate || null,
        address: formData.address.trim() || null,
        origin: formData.origin,
        gender: formData.gender,
      } as any);

      if (error) throw error;

      toast({
        title: "נרשמת בהצלחה! 🎉",
        description: "בקרוב ניצור איתך קשר ונמצא לך משפחה מארחת לסעודת שבת",
      });

      navigate("/");
    } catch (error) {
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
