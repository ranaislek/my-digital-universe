import { useState } from "react";
import { Mail, Linkedin, Github, Youtube, MapPin, Heart, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface ContactProps {
  isTeaser?: boolean;
}

const Contact = ({ isTeaser = false }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      href: "https://www.youtube.com/@ranaislek",
      color: "hover:text-[#FF0000]",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:islekrana@gmail.com",
      color: "hover:text-primary",
    },
  ];



  // ... inside component ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Save to Database (Supabase)
      const { error: dbError } = await supabase
        .from('messages')
        .insert([
          { name: formData.name, email: formData.email, message: formData.message }
        ]);

      if (dbError) throw dbError;

      // 2. Send Email Notification (Level 99)
      try {
        // Create a timeout promise (5 seconds)
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email request timed out')), 5000)
        );

        // Race the fetch against the timeout
        const response: any = await Promise.race([
          fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          }),
          timeoutPromise
        ]);

        if (!response.ok) {
          let errorMessage = 'Unknown email error';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || JSON.stringify(errorData);
          } catch (parseError) {
            const text = await response.text();
            errorMessage = text || `HTTP Status ${response.status}`;
          }
          throw new Error(errorMessage);
        }

        // Only show full success if email also succeeded
        toast.success("Message sent and email verification dispatched! 🚀");
        setFormData({ name: "", email: "", message: "" });

      } catch (emailError: any) {
        console.error('Email notification failed:', emailError);
        // Distinct warning for DB-only success
        toast.warning(`Saved to database, but email delivery skipped: ${emailError.message}`);
        setFormData({ name: "", email: "", message: "" });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 blob-shape opacity-50" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 blob-shape-2 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
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
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Currently in Istanbul, Türkiye</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info Side */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl font-medium mb-6">Get in Touch</h3>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
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

            <div className="p-6 rounded-2xl bg-card border border-border mt-8">
              <h4 className="font-medium mb-2">Direct Contact</h4>
              <a
                href="mailto:islekrana@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>islekrana@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="hello@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 ml-1">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px]"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Fun message */}

      </div>
    </section>
  );
};

export default Contact;
