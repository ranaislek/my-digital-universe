import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Play, Youtube, MapPin, Edit3 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { ContentItem } from "../data/content";
import PostControls from "./admin/PostControls";
import { useAuth } from "./AuthProvider";

const Thoughts = ({ isTeaser = false }: { isTeaser?: boolean }) => {
  const [activeTab, setActiveTab] = useState<"all" | "vlog" | "blog" | "drafts">("all");
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [drafts, setDrafts] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, [isAdmin]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .in('type', ['blog', 'vlog']);

      if (error) {
        throw error;
      }

      // Map back to ContentItem interface
      const allPosts: ContentItem[] = (data || []).map(post => ({
        ...post,
        readTime: post.read_time
      }));

      // Sort by PINNED (Hero preference), then DATE (Event Date) - Newest First
      allPosts.sort((a, b) => {
        // Pinned posts come first
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        // Then Sort by Date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      // Separate drafts and published
      const publishedPosts = allPosts.filter(p => p.status === 'published');
      const draftPosts = allPosts.filter(p => p.status === 'draft');

      setPosts(publishedPosts);
      if (isAdmin) {
        setDrafts(draftPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContent = activeTab === "all"
    ? posts
    : activeTab === "drafts"
      ? drafts
      : posts.filter((item) => item.type === activeTab);

  // Layout Logic
  // Homepage (Teaser): Show only FEATURED posts. 1 Hero + Grid (2 cols)
  // Blog Page: Show ALL posts. Grid (3 cols)
  const displayedContent = isTeaser
    ? filteredContent.filter(p => p.featured) // Only featured on homepage
    : filteredContent;

  if (isLoading) {
    return <div className="py-24 text-center">Loading content...</div>;
  }

  // Helper to render a post card
  const PostCard = ({ post, isDraft = false, isHero = false }: { post: ContentItem, isDraft?: boolean, isHero?: boolean }) => {
    const isExternal = post.type === "vlog";
    const href = (isExternal && !isDraft) ? post.link : `/blog/${post.id}`;
    const Component = (isExternal && !isDraft) ? "a" : Link;
    const props = (isExternal && !isDraft)
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { to: href };

    return (
      // @ts-ignore
      <Component
        {...props}
        className={`group cursor-pointer card-hover ${isDraft ? 'opacity-80 hover:opacity-100' : ''} ${isHero ? 'md:grid md:grid-cols-2 md:gap-6 items-center bg-card/50 p-4 md:p-5 rounded-3xl border border-border/50' : ''}`}
      >
        {/* Thumbnail */}
        <div className={`rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-pop-3/20 to-pop-2/20 relative group/thumb ${isHero ? 'aspect-video w-full' : 'aspect-video mb-3'}`}>
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

          {isAdmin && (
            <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <PostControls
                postId={post.id}
                isFeatured={post.featured}
                isPinned={post.pinned}
                onUpdate={fetchPosts}
                onDelete={fetchPosts}
              />
            </div>
          )}

          {post.type === "vlog" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-5 h-5 text-primary fill-primary" />
              </div>
            </div>
          )}
          {isDraft && (
            <div className="absolute top-2 left-2 z-20">
              <span className="px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-md shadow-sm uppercase tracking-wider">
                Draft
              </span>
            </div>
          )}
          {post.location && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-card/80 backdrop-blur-sm rounded-full text-[10px] z-10">
              <MapPin className="w-3 h-3 text-primary" />
              {post.location}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={isHero ? "mt-4 md:mt-0" : ""}>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
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
            <span
              className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${post.type === "vlog"
                ? "bg-[#FF0000]/10 text-[#FF0000]"
                : "bg-primary/10 text-primary"
                }`}
            >
              {post.type === "vlog" ? "📹 Vlog" : "📝 Blog"}
            </span>
          </div>

          <h3 className={`font-serif font-medium mb-2 group-hover:text-primary transition-colors ${isHero ? "text-2xl md:text-3xl" : "text-base line-clamp-2"}`}>
            {post.title}
          </h3>
          <p className={`text-muted-foreground text-xs ${isHero ? "line-clamp-3 text-sm" : "line-clamp-2"}`}>
            {post.excerpt}
          </p>

          {isHero && (
            <div className="mt-4 flex items-center text-primary font-medium text-xs group/link">
              Read Story <ArrowRight className="w-3 h-3 ml-2 group-hover/link:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </Component>
    );
  };

  return (
    <section id="thoughts" className={`relative ${isTeaser ? "min-h-screen flex flex-col justify-center py-20 md:py-24" : "pb-12"}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${isTeaser ? "mb-8" : "mb-16"}`}>
          <div>
            <span className="text-primary font-medium text-xs tracking-wider uppercase">
              Blog & Vlogs
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mt-1">
              Stories & <span className="gradient-text">Adventures</span>
            </h2>
            <p className={`text-muted-foreground mt-2 max-w-lg ${isTeaser ? "text-sm" : ""}`}>
              Sharing my Erasmus journey, study abroad tips, and random life musings.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@ranaislek"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0000]/10 text-[#FF0000] rounded-full text-sm font-medium hover:bg-[#FF0000]/20 transition-colors group"
          >
            <Youtube className="w-4 h-4" />
            <span>Subscribe on YouTube</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* FILTERS */}
        {!isTeaser && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "blog" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Blogs
            </button>
            <button
              onClick={() => setActiveTab("vlog")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "vlog" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Vlogs
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab("drafts" as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "drafts" ? "bg-orange-500 text-white" : "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"}`}
              >
                Drafts ({drafts.length})
              </button>
            )}
          </div>
        )}

        {/* PUBLISHED CONTENT */}
        {isTeaser ? (
          <div className="space-y-4">
            {displayedContent.length > 0 && (
              <div className="col-span-full">
                <PostCard post={displayedContent[0]} isHero={true} />
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              {displayedContent.slice(1, 4).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          /* BLOG PAGE LAYOUT: 3 cols */
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedContent.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              {displayedContent.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No content found for this category.
                </div>
              )}
            </div>

            {/* RESTORED DRAFTS SECTION (Below main content) */}
            {isAdmin && activeTab !== "drafts" && (() => {
              // Filter drafts based on the active tab
              const visibleDrafts = activeTab === "all"
                ? drafts
                : drafts.filter(d => d.type === activeTab);

              if (visibleDrafts.length === 0) return null;

              return (
                <div className="mt-16 pt-8 border-t border-border">
                  <h3 className="text-xl font-serif font-medium mb-6 flex items-center gap-2 text-orange-500">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    {activeTab === "all" ? "Drafts" : `${activeTab === "blog" ? "Blog" : "Vlog"} Drafts`}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleDrafts.map((post) => (
                      <PostCard key={post.id} post={post} isDraft={true} />
                    ))}
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {isTeaser && (
          <div className="text-center mt-8">
            <Link
              to="/thoughts"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors group"
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
