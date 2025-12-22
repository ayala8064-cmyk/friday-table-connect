import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    label: "דף הבית",
    href: "#"
  }, {
    label: "איך זה עובד",
    href: "#how-it-works"
  }, {
    label: "אודות",
    href: "#about"
  }, {
    label: "צור קשר",
    href: "#contact"
  }];
  return <header className="fixed top-0 right-0 left-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a href="#" className="flex items-center gap-3" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }}>
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-warm">
              <Heart className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">קשישי
 
          </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => <motion.a key={item.label} href={item.href} className="text-foreground/80 hover:text-primary transition-colors font-medium" initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: index * 0.1
          }}>
                {item.label}
              </motion.a>)}
          </nav>

          {/* CTA Button */}
          <motion.div className="hidden md:block" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }}>
            <Button variant="accent" size="lg">
              הצטרפו אלינו
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <motion.div className="md:hidden py-6 border-t border-border" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }}>
            <nav className="flex flex-col gap-4">
              {navItems.map(item => <a key={item.label} href={item.href} className="text-foreground/80 hover:text-primary transition-colors font-medium text-lg py-2" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>)}
              <Button variant="accent" size="lg" className="mt-4">
                הצטרפו אלינו
              </Button>
            </nav>
          </motion.div>}
      </div>
    </header>;
};
export default Header;