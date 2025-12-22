import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7
        }} className="text-center lg:text-right">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">מחברים לבבות ודורות</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              פותחים את הבית
              <br />
              <span className="text-accent">והלב</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              עמותת "קשישי" מחברת בין קשישים שחווים בדידות לבין משפחות מהשכונה, 
              לארוחות שישי ביתיות וחמות. כי לכולנו מגיע להרגיש חלק ממשפחה.
            </p>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl">
                <Users className="w-5 h-5" />
                אני משפחה מארחת
              </Button>
              <Button variant="heroOutline" size="xl">
                <Heart className="w-5 h-5" />
                אני קשיש/ה
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.6
          }} className="flex items-center gap-6 mt-10 justify-center lg:justify-start text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                <span className="text-sm">ללא עלות</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                <span className="text-sm">פשוט ומהיר</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                <span className="text-sm">בשכונה שלכם</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.7,
          delay: 0.3
        }} className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Circle */}
              <div className="absolute inset-8 bg-gradient-to-br from-secondary to-card rounded-full shadow-warm-lg flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop&crop=faces" alt="משפחה וקשיש בארוחת שישי" className="w-full h-full object-cover" />
              </div>

              {/* Floating Elements */}
              <motion.div animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute top-4 right-4 bg-card p-4 rounded-2xl shadow-warm">
                <Heart className="w-8 h-8 text-accent" />
              </motion.div>

              <motion.div animate={{
              y: [0, 10, 0]
            }} transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }} className="absolute bottom-4 left-4 bg-accent text-accent-foreground p-4 rounded-2xl shadow-warm">
                <Users className="w-8 h-8" />
              </motion.div>

              {/* Stats Badge */}
              <motion.div animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute bottom-12 right-0 bg-card p-4 rounded-2xl shadow-warm-lg">
                <p className="text-3xl font-bold text-accent">2,500+</p>
                <p className="text-sm text-muted-foreground text-center">ארוחות שישי </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;