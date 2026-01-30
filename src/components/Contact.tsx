import { Mail, Linkedin, Github, Youtube, MapPin, Heart } from "lucide-react";

const Contact = () => {
  const socials = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ranaislek",
      color: "hover:text-[#0077B5]",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/ranaislek",
      color: "hover:text-foreground",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "#",
      color: "hover:text-[#FF0000]",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:islekrana@gmail.com",
      color: "hover:text-primary",
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 blob-shape opacity-50" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 blob-shape-2 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Let's Connect
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-6">
            Say <span className="gradient-text">Hello!</span> 
            <span className="inline-block ml-2">👋</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            Whether it's about data, Erasmus advice, dance, or just to chat — 
            I'd love to hear from you!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Currently in Istanbul, Türkiye</span>
          </div>

          {/* Email CTA */}
          <a
            href="mailto:islekrana@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25 mb-12"
          >
            <Mail className="w-5 h-5" />
            <span>islekrana@gmail.com</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground ${social.color} transition-all hover:scale-110 hover:border-primary/30`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Fun message */}
          <p className="mt-12 text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> and lots of ☕
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
