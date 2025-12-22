import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "מאז שהתחלתי להגיע למשפחת כהן, יום שישי חזר להיות היום הכי טוב בשבוע. הילדים מחכים לי, ואני מרגישה שוב חלק ממשפחה.",
    author: "שרה, בת 78",
    role: "קשישה",
    image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote: "הילדים שלנו למדו כל כך הרבה מסבתא רחל. הסיפורים, החוכמה, האהבה - זה משהו שלא ניתן לתאר במילים. היא חלק מהמשפחה.",
    author: "משפחת לוי",
    role: "משפחה מארחת",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=150&h=150&fit=crop&crop=faces",
  },
  {
    quote: "אחרי שאשתי נפטרה, הייתי לבד לגמרי. קשישי נתנה לי חיים חדשים. כל שבוע אני מחכה ליום שישי עם משפחת אברהם.",
    author: "יעקב, בן 82",
    role: "קשיש",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            מה אומרים עלינו
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            סיפורים אמיתיים מקשישים ומשפחות שהצטרפו לקהילה שלנו
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card p-8 rounded-2xl shadow-warm relative"
            >
              <Quote className="w-10 h-10 text-accent/20 absolute top-6 left-6" />
              
              <p className="text-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent/20"
                />
                <div>
                  <p className="font-bold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
