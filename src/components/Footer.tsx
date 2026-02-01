import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/rana-frog-logo.png" alt="Rana" className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
          </Link>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Rana İşlek
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/about"
              className="hover:text-primary transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="hover:text-primary transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Portfolio
            </Link>
            <Link
              to="/thoughts"
              className="hover:text-primary transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Vlogs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
