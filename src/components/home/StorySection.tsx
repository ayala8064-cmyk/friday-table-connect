import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Frown, Smile } from "lucide-react";
const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="about" className="py-24 bg-secondary/50" ref={ref}>
      <div className="container mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            הסיפור שלנו
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            כי לכל קשיש מגיע להרגיש חלק ממשפחה, ולכל משפחה יש מה לתת
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* The Problem */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="bg-card p-8 rounded-2xl shadow-warm">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-6">
              <Frown className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">הבדידות</h3>
            <p className="text-muted-foreground leading-relaxed">
              עשרות אלפי קשישים בישראל חיים לבדם וחווים בדידות קשה. 
              ימי שישי, שאמורים להיות ימי משפחה וחום, הופכים לימים קשים במיוחד.
              הבדידות פוגעת בבריאות הנפשית והפיזית, ומונעת מהם ליהנות מחיים מלאים.
            </p>
          </motion.div>

          {/* The Solution */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="bg-card p-8 rounded-2xl shadow-warm">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">החיבורים</h3>
            <p className="text-muted-foreground leading-relaxed">
              חיבור פשוט ומשמעותי. אנחנו מחברים בין קשישים מהשכונה לבין משפחות 
              שפותחות את דלת ביתן לארוחת שישי. לא צריך יותר מזה כדי לשנות חיים.
              רישום קל, התאמה לפי אזור, וקשר אנושי אמיתי.
            </p>
          </motion.div>

          {/* The Impact */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="bg-card p-8 rounded-2xl shadow-warm">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Smile className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4 mx-0">התרומה לקהילה </h3>
            <p className="text-muted-foreground leading-relaxed">
              שני הצדדים מרוויחים. הקשישים מקבלים חום, אוזן קשבת וחוויה משפחתית.
              המשפחות מעשירות את ילדיהן בערכים, סיפורים וקשר בין-דורי משמעותי.
              יחד אנחנו בונים קהילה חזקה יותר.
            </p>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default StorySection;