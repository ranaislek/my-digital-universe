import { ArrowDown, Sparkles, Heart, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 blob-shape float-animation" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 blob-shape-2 float-animation-delayed" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pop-2/15 blob-shape float-animation" />
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-pop-4/15 blob-shape-2 float-animation-delayed" />

      {/* Scattered Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-primary/20 sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${12 + Math.random() * 12}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/70 font-medium">Data Analyst & Content Creator</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-6 text-balance leading-tight">
          <span className="text-foreground">Hey, I'm</span>
          <br />
          <span className="gradient-text">Rana İşlek</span>
          <Heart className="inline-block w-8 h-8 md:w-12 md:h-12 text-primary ml-3 wiggle-animation" fill="currentColor" />
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          MSc graduate in Big Data & Analytics, exploring the world through data, 
          dance, and documenting my Erasmus adventures across Europe. 
          <span className="text-primary font-medium"> Brussels → Barcelona → Padova</span> ✨
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
          >
            Explore My Work
          </a>
          <a
            href="#thoughts"
            className="px-8 py-3.5 border-2 border-primary/30 text-foreground rounded-full font-medium hover:bg-primary/10 transition-all hover:border-primary/50"
          >
            Watch My Vlogs
          </a>
        </div>

        {/* Social proof / quick stats */}
        <div className="flex items-center justify-center gap-8 mt-16 text-sm text-muted-foreground">
          <div className="text-center">
            <div className="font-serif text-2xl text-foreground font-medium">5+</div>
            <div>Countries</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="font-serif text-2xl text-foreground font-medium">3</div>
            <div>Languages</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="font-serif text-2xl text-foreground font-medium">∞</div>
            <div>Curiosity</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to discover</span>
        <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
