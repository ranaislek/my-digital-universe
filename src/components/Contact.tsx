import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2 mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Whether you want to collaborate on research, discuss ideas, or just say hello—
            I'd love to hear from you. Let's explore new possibilities together.
          </p>

          {/* Email Form */}
          <form className="flex flex-col sm:flex-row gap-3 mb-12">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              <span>Say Hello</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-3 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
