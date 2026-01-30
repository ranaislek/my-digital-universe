import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-serif text-lg">
              <span className="text-foreground">rana</span>
              <span className="text-primary">.</span>
            </span>
          </a>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Rana İşlek • Made with 
            <Heart className="w-3 h-3 text-primary fill-primary mx-1" />
            in Istanbul
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#portfolio" className="hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#thoughts" className="hover:text-primary transition-colors">
              Vlogs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
