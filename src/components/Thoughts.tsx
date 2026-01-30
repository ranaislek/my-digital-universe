import { ArrowRight, Calendar, Clock, Play, Youtube, MapPin } from "lucide-react";

const content = [
  {
    type: "vlog",
    title: "A Day in My Erasmus Life — Padova Edition",
    excerpt: "Coffee runs, research meetings, and exploring Italian streets after sunset...",
    date: "Jan 2025",
    duration: "12 min",
    location: "Italy 🇮🇹",
  },
  {
    type: "vlog",
    title: "Barcelona Study Abroad Tips",
    excerpt: "Everything you need to know before your exchange in Barcelona — housing, food, nightlife!",
    date: "May 2024",
    duration: "15 min",
    location: "Spain 🇪🇸",
  },
  {
    type: "vlog",
    title: "How I Got Into Erasmus Mundus",
    excerpt: "The application process, motivation letters, and what they don't tell you...",
    date: "Sep 2023",
    duration: "18 min",
    location: "Belgium 🇧🇪",
  },
  {
    type: "blog",
    title: "Data Analyst vs Data Scientist",
    excerpt: "Breaking down the differences and which path might be right for you...",
    date: "Dec 2024",
    readTime: "5 min read",
  },
  {
    type: "blog",
    title: "My Dance Journey at University",
    excerpt: "From shy beginner to club president — how dance changed my student life...",
    date: "Jun 2023",
    readTime: "4 min read",
  },
  {
    type: "vlog",
    title: "Budapest Exchange Semester",
    excerpt: "Thermal baths, ruin bars, and surviving Hungarian winters as a Turkish student...",
    date: "Feb 2023",
    duration: "20 min",
    location: "Hungary 🇭🇺",
  },
];

const Thoughts = () => {
  return (
    <section id="thoughts" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Blog & Vlogs
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2">
              Stories & <span className="gradient-text">Adventures</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Sharing my Erasmus journey, study abroad tips, and random life musings.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0000]/10 text-[#FF0000] rounded-full font-medium hover:bg-[#FF0000]/20 transition-colors group"
          >
            <Youtube className="w-5 h-5" />
            <span>Subscribe on YouTube</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((post, index) => (
            <article
              key={index}
              className="group cursor-pointer card-hover"
            >
              {/* Thumbnail */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-pop-3/20 to-pop-2/20 mb-4 relative">
                {post.type === "vlog" && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-primary fill-primary" />
                      </div>
                    </div>
                    {post.location && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-card/80 backdrop-blur-sm rounded-full text-xs">
                        <MapPin className="w-3 h-3 text-primary" />
                        {post.location}
                      </div>
                    )}
                  </>
                )}
                {post.type === "blog" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">✍️</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.type === "vlog" ? post.duration : post.readTime}
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {post.excerpt}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded-full font-medium ${
                  post.type === "vlog"
                    ? "bg-[#FF0000]/10 text-[#FF0000]"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {post.type === "vlog" ? "📹 Vlog" : "📝 Blog"}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;
