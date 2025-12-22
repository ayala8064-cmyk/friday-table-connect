import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Home, Calendar, Heart } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 850,
    label: "קשישים רשומים",
    suffix: "+",
  },
  {
    icon: Home,
    value: 620,
    label: "משפחות מארחות",
    suffix: "+",
  },
  {
    icon: Calendar,
    value: 2500,
    label: "ארוחות שישי",
    suffix: "+",
  },
  {
    icon: Heart,
    value: 98,
    label: "שביעות רצון",
    suffix: "%",
  },
];

const AnimatedNumber = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-primary" ref={ref}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-warm">
                <stat.icon className="w-8 h-8 text-accent-foreground" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </p>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
