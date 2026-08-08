import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const GlobalScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            // Check if page actually has scrollable content
            const scrollableHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const hasScrollableContent = scrollableHeight > viewportHeight + 40;

            if (!hasScrollableContent) {
                setIsVisible(false);
                return;
            }

            const scrolledTo = window.scrollY + viewportHeight;
            const threshold = scrollableHeight - 100;

            if (scrolledTo >= threshold) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        checkScroll();
        window.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-1.5 pointer-events-none mix-blend-difference text-white font-sans"
                >
                    <span className="font-sans text-xs lowercase tracking-wider font-normal opacity-90">
                        scroll
                    </span>
                    <ArrowDown className="w-4 h-4 animate-bounce opacity-90" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalScrollIndicator;
