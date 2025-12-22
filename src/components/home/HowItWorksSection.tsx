import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Search, Send, Utensils } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "נרשמים למערכת",
    description: "רישום פשוט ומהיר כמשפחה מארחת או כקשיש/ה. תהליך נוח שלוקח דקות ספורות.",
    color: "bg-accent",
  },
  {
    icon: Search,
    title: "המערכת מוצאת התאמה",
    description: "אנחנו מחפשים עבורכם התאמה מושלמת לפי אזור מגורים וקרבה גיאוגרפית.",
    color: "bg-primary",
  },
  {
    icon: Send,
    title: "מקבלים פרטי קשר",
    description: "לאחר שמצאנו התאמה, שני הצדדים מקבלים את פרטי הקשר ליצירת קשר ישיר.",
    color: "bg-accent",
  },
  {
    icon: Utensils,
    title: "נפגשים לארוחה",
    description: "יוצרים קשר, מתאמים ונפגשים לארוחת שישי ביתית וחמה. פשוט ככה.",
    color: "bg-primary",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            איך זה עובד?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ארבעה שלבים פשוטים ואתם כבר חלק מהקהילה שלנו
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-24 right-[12.5%] left-[12.5%] h-1 bg-border rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 mb-6">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto shadow-warm-lg`}>
                    <step.icon className="w-9 h-9 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-card border-2 border-border rounded-full flex items-center justify-center font-bold text-primary shadow-sm">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
