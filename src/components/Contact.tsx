import { useState } from "react";
import { Mail, Linkedin, Github, Youtube, MapPin, Send, Instagram } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

interface ContactProps {
  isTeaser?: boolean;
}

const Contact = ({ isTeaser = false }: ContactProps) => {
  const { t } = useTranslation();
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
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/ranaislek",
      color: "hover:text-[#E1306C]",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:islekrana@gmail.com",
      color: "hover:text-primary",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from('messages')
        .insert([
          { name: formData.name, email: formData.email, message: formData.message }
        ]);

      if (dbError) throw dbError;

      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email request timed out')), 5000)
        );

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

        toast.success("Message sent successfully! 🚀");
        setFormData({ name: "", email: "", message: "" });

      } catch (emailError: any) {
        console.error('Email notification failed:', emailError);
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
    <section id="contact" className={`relative flex-grow flex flex-col justify-center ${isTeaser ? "min-h-screen py-10 md:py-12" : "py-6 md:py-8"}`}>
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 blob-shape opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/10 blob-shape-2 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Header for Teaser Mode */}
        {isTeaser && (
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center mb-8 lg:mb-12">
            <span className="inline-block text-primary font-medium text-xs tracking-wider uppercase mb-2">
              {t('contact.subtitle')}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mt-1 mb-3">
              {t('contact.title1')} <span className="gradient-text">{t('contact.title2')}</span>
              <span className="inline-block ml-2">👋</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-2 max-w-[500px] text-center text-balance mx-auto">
              {t('contact.description')}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{t('contact.location')}</span>
            </div>
          </div>
        )}

        {/* 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 max-w-5xl mx-auto items-center">
          {/* Left Column: Header text & socials for standalone page / Socials for teaser */}
          <div className="space-y-6">
            {!isTeaser && (
              <div className="space-y-4 text-left">
                <span className="inline-block text-primary font-medium text-xs tracking-wider uppercase">
                  {t('contact.subtitle')}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  {t('contact.title1')} <span className="gradient-text">{t('contact.title2')}</span>
                  <span className="inline-block ml-2">👋</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {t('contact.description')}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{t('contact.location')}</span>
                </div>
              </div>
            )}

            {isTeaser && (
              <h3 className="font-serif text-xl font-medium mb-4">{t('contact.getInTouch')}</h3>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110 hover:border-primary/30 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Direct Contact Card */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-2">{t('contact.directContact')}</h4>
              <a
                href="mailto:islekrana@gmail.com"
                className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>islekrana@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="bg-card rounded-3xl border border-border shadow-md p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-1.5 ml-1 text-muted-foreground">{t('contact.form.name')}</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-1.5 ml-1 text-muted-foreground">{t('contact.form.email')}</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-1.5 ml-1 text-muted-foreground">{t('contact.form.message')}</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm ${isTeaser ? "min-h-[90px]" : "min-h-[130px]"}`}
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>{t('contact.form.submitting')}</span>
                ) : (
                  <>
                    <span>{t('contact.form.submit')}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
