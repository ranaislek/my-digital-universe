import { Heart, Sparkles, Linkedin, Github, Youtube, Instagram, Mail } from "lucide-react";
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

          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="https://linkedin.com/in/ranaislek" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077B5] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/ranaislek" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@ranaislek" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/ranaislek" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:islekrana@gmail.com" className="hover:text-primary transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
