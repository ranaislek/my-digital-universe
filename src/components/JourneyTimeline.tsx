import { motion } from "framer-motion";
import { journeyEvents } from "@/data/journey";
import { MapPin, Calendar, Briefcase, GraduationCap, Plane, Star } from "lucide-react";

const JourneyTimeline = () => {
    return (
        <div className="relative py-20 px-4 md:px-0 max-w-5xl mx-auto">
            {/* Center Line (Hidden on mobile, visible on md+) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

            {journeyEvents.map((event, index) => {
                const isEven = index % 2 === 0;

                // Icon selection logic
                const getIcon = () => {
                    switch (event.type) {
                        case 'education': return <GraduationCap className="w-5 h-5" />;
                        case 'work': return <Briefcase className="w-5 h-5" />;
                        case 'travel': return <Plane className="w-5 h-5" />;
                        default: return <Star className="w-5 h-5" />;
                    }
                };

                return (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative flex flex-col md:flex-row gap-8 mb-24 md:mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Date Bubble (Mobile: Top Left, Desktop: Center) */}
                        <div className="absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-muted z-10 shadow-xl">
                            <span className="text-xs font-bold text-center leading-tight px-1">
                                {event.year}
                            </span>
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-[calc(50%-40px)] pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                            <div className="group relative bg-card/50 hover:bg-card border border-border/50 hover:border-border p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1">

                                {/* Image (Optional) */}
                                {event.image && (
                                    <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                )}

                                <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                    <div className="flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-wider">
                                        {getIcon()}
                                        <span>{event.type}</span>
                                    </div>

                                    <h3 className="font-serif text-2xl font-bold">{event.title}</h3>

                                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                        <MapPin className="w-3 h-3" />
                                        {event.location}
                                    </div>

                                    <p className="text-muted-foreground mt-2 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Spacer for desktop layout balance */}
                        <div className="hidden md:block w-[calc(50%-40px)]" />
                    </motion.div>
                );
            })}

            {/* End Node */}
            <div className="relative flex justify-center mt-[-50px]">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
            </div>
        </div>
    );
};

export default JourneyTimeline;
