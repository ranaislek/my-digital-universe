import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Play, Youtube, MapPin } from "lucide-react";
import { supabase } from "../lib/supabase";
import { ContentItem } from "../data/content";

const Thoughts = ({ isTeaser = false }: { isTeaser?: boolean }) => {
  const [activeTab, setActiveTab] = useState<"all" | "vlog" | "blog">("all");
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Fetch published posts
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Map back to ContentItem interface (snake_case to camelCase where needed)
      const mappedPosts: ContentItem[] = (data || []).map(post => ({
        ...post,
        readTime: post.read_time
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Fallback for now? Or just show empty state
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContent = activeTab === "all"
    ? posts
    : posts.filter((item) => item.type === activeTab);

  const displayedContent = isTeaser ? filteredContent.slice(0, 3) : filteredContent;

  if (isLoading) {
    return <div className="py-24 text-center">Loading content...</div>;
  }

  return (
    <section id="thoughts" className={`relative ${isTeaser ? "py-24 md:py-32" : "pb-12"}`}>
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
            href="https://www.youtube.com/@ranaislek"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0000]/10 text-[#FF0000] rounded-full font-medium hover:bg-[#FF0000]/20 transition-colors group"
          >
            <Youtube className="w-5 h-5" />
            <span>Subscribe on YouTube</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedContent.map((post) => {
            const isExternal = post.type === "vlog";
            const href = isExternal ? post.link : `/blog/${post.id}`;
            const Component = isExternal ? "a" : Link;
            const props = isExternal
              ? { href, target: "_blank", rel: "noopener noreferrer" }
              : { to: href };

            return (
              // @ts-ignore
              <Component
                {...props}
                key={post.id}
                className="group cursor-pointer card-hover"
              >
                {/* Thumbnail */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-pop-3/20 to-pop-2/20 mb-4 relative">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">✍️</span>
                    </div>
                  )}

                  {post.type === "vlog" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-6 h-6 text-primary fill-primary" />
                      </div>
                    </div>
                  )}
                  {post.location && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-card/80 backdrop-blur-sm rounded-full text-xs z-10">
                      <MapPin className="w-3 h-3 text-primary" />
                      {post.location}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  {(post.duration || post.readTime) && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.type === "vlog" ? post.duration : post.readTime}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {post.excerpt}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs rounded-full font-medium ${post.type === "vlog"
                    ? "bg-[#FF0000]/10 text-[#FF0000]"
                    : "bg-primary/10 text-primary"
                    }`}
                >
                  {post.type === "vlog" ? "📹 Vlog" : "📝 Blog"}
                </span>
              </Component>
            );
          })}
        </div>

        {isTeaser && (
          <div className="text-center mt-12">
            <Link
              to="/thoughts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
            >
              <span>Read More Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Thoughts;
