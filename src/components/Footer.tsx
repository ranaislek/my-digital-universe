import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-serif text-lg">
              <span className="text-foreground">rana</span>
              <span className="text-primary">.</span>
            </span>
          </Link>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Rana İşlek
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/portfolio" className="hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link to="/thoughts" className="hover:text-primary transition-colors">
              Vlogs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
