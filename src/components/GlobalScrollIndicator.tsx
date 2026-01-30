import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const GlobalScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate how close we are to the bottom
            const scrolledTo = window.scrollY + window.innerHeight;
            const threshold = document.documentElement.scrollHeight - 100; // 100px before bottom

            // If we are near the bottom, hide it. Otherwise show it.
            // Also hide if we haven't scrolled at all? No, user wants it to prompt scrolling.
            // Maybe hide if we are at the very top? No, usually that's when you need it.

            if (scrolledTo >= threshold) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference text-white"
                >
                    <span className="text-[10px] uppercase tracking-widest font-medium opacity-80">
                        Scroll
                    </span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalScrollIndicator;
