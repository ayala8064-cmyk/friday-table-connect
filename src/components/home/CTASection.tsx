import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowLeft } from "lucide-react";
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section className="py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            תורכם להצטרף 
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            בין אם אתם משפחה שרוצה לארח או קשיש/ה שמחפש/ת חיבור - 
            אנחנו כאן בשבילכם. ההצטרפות פשוטה, מהירה וללא עלות.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Family Card */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="bg-card p-8 rounded-2xl shadow-warm-lg border border-border hover:shadow-warm-lg hover:border-accent/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              אני משפחה מארחת
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              פתחו את דלת ביתכם לקשיש/ה מהשכונה. 
              תנו לילדיכם חוויה של נתינה וקשר בין-דורי. 
              ההצטרפות פשוטה ולוקחת דקות ספורות.
            </p>
            <Button variant="accent" size="lg" className="w-full group">
              הצטרפו כמשפחה
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Elderly Card */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="bg-card p-8 rounded-2xl shadow-warm-lg border border-border hover:shadow-warm-lg hover:border-primary/30 transition-all duration-300 group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              אני קשיש/ה
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              מחפש/ת חברה ותחושה של בית בשישי בערב? אנחנו נמצא עבורך משפחה מארחתחמה ולבבית כאן בשכונה. ההרשמה קלה ונגישה, ואנחנו כאן לעזור.
            </p>
            <Button variant="default" size="lg" className="w-full group">
              הצטרפו כקשיש/ה
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Trust Message */}
        <motion.p initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {}} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="text-center text-muted-foreground mt-10">
          <Heart className="w-4 h-4 inline-block ml-2 text-accent" />
          ללא עלות • פשוט ומהיר • פרטיות מובטחת
        </motion.p>
      </div>
    </section>;
};
export default CTASection;