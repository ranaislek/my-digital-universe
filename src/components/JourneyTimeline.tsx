import { motion } from "framer-motion";
import { journeyEvents } from "@/data/journey";
import { MapPin, Calendar, Briefcase, GraduationCap, Plane, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const JourneyTimeline = () => {
    const { t } = useTranslation();
    return (
        <div className="relative py-20 px-4 md:px-6 max-w-6xl mx-auto">
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
                        className={`relative flex flex-col md:flex-row gap-8 mb-14 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Date Bubble (Mobile: Left, Desktop: Center) */}
                        <div className="absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-muted z-10 shadow-xl">
                            <span className="text-[11px] sm:text-xs font-bold text-center leading-tight px-1 tracking-tight">
                                {t(`journey.events.${event.id}.year`, { defaultValue: event.year })}
                            </span>
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-[calc(50%-44px)] pl-16 md:pl-0 ${isEven ? 'md:pr-6' : 'md:pl-6'}`}>
                            <div className="group relative bg-card/50 hover:bg-card border border-border/50 hover:border-border p-6 md:p-7 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1">

                                <div className={`flex flex-col sm:flex-row gap-5 items-center ${isEven ? '' : 'sm:flex-row-reverse'}`}>
                                    {/* Image (Optional) */}
                                    {event.image && (
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden rounded-xl">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${event.imagePosition === 'top' ? 'object-top' :
                                                    event.imagePosition === 'bottom' ? 'object-bottom' :
                                                        'object-center'
                                                    }`}
                                            />
                                        </div>
                                    )}

                                    <div className={`flex flex-col gap-1.5 flex-grow ${isEven ? 'text-left' : 'text-left sm:text-right'}`}>
                                        <div className={`flex items-center gap-2 text-primary text-xs font-medium uppercase tracking-wider ${isEven ? '' : 'sm:flex-row-reverse'}`}>
                                            {getIcon()}
                                            <span>{t(`journey.events.${event.id}.type`, { defaultValue: event.type })}</span>
                                        </div>

                                        <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight">
                                            {t(`journey.events.${event.id}.title`, { defaultValue: event.title })}
                                        </h3>

                                        <div className={`flex items-center gap-1 text-muted-foreground text-xs ${isEven ? '' : 'sm:flex-row-reverse'}`}>
                                            <MapPin className="w-3.5 h-3.5" />
                                            {t(`journey.events.${event.id}.location`, { defaultValue: event.location })}
                                        </div>

                                        <p className="text-muted-foreground mt-2 text-sm md:text-base leading-relaxed">
                                            {t(`journey.events.${event.id}.description`, { defaultValue: event.description })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Spacer for desktop layout balance */}
                        <div className="hidden md:block w-[calc(50%-44px)]" />
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
