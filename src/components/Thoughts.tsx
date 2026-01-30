import { ArrowRight, Calendar, Clock, Play } from "lucide-react";

const blogPosts = [
  {
    type: "blog",
    title: "The Art of Balancing Academia and Creativity",
    excerpt: "How I navigate the structured world of research while nurturing my creative spirit...",
    date: "Jan 15, 2024",
    readTime: "5 min read",
  },
  {
    type: "blog",
    title: "Lessons from Failed Experiments",
    excerpt: "What 100 failed experiments taught me about resilience and the nature of discovery...",
    date: "Dec 28, 2023",
    readTime: "8 min read",
  },
  {
    type: "vlog",
    title: "A Day in the Life of a Researcher",
    excerpt: "Join me through the labs, libraries, and late-night writing sessions...",
    date: "Jan 5, 2024",
    duration: "12 min",
  },
];

const Thoughts = () => {
  return (
    <section id="thoughts" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Thoughts & Stories
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-2">
              Latest <span className="gradient-text">Explorations</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>View all posts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-aurora-2/10 to-accent/20 group-hover:opacity-80 transition-opacity" />
                {post.type === "vlog" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-foreground fill-foreground" />
                    </div>
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

              <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {post.excerpt}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                  post.type === "vlog"
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {post.type === "vlog" ? "Vlog" : "Blog"}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;
