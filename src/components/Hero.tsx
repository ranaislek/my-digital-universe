import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 aurora-glow" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl float-animation" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl float-animation-delayed" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-aurora-2/5 blur-3xl float-animation" />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full pulse-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Welcome to my universe</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-6 text-balance">
          <span className="gradient-text">Explorer.</span>
          <br />
          <span className="text-foreground">Creator.</span>
          <br />
          <span className="text-muted-foreground">Thinker.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          A space where academia meets creativity, where research intertwines with art, 
          and where every thought becomes a constellation in my expanding universe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Explore My Work
          </a>
          <a
            href="#thoughts"
            className="px-8 py-3 border border-border text-foreground rounded-full font-medium hover:bg-muted transition-colors"
          >
            Read My Thoughts
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
