import { useState } from "react";
import { Star } from "lucide-react";

interface BackgroundElementsProps {
    showStars?: boolean;
}

const BackgroundElements = ({ showStars = false }: BackgroundElementsProps) => {
    // Stable Stars Generation
    const [stars] = useState(() =>
        [...Array(20)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${12 + Math.random() * 12}px`,
            delay: `${Math.random() * 2}s`
        }))
    );

    return (
        <>
            {/* Decorative Blobs */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-primary/10 blob-shape float-animation pointer-events-none" />
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/10 blob-shape-2 float-animation-delayed pointer-events-none" />
            <div className="fixed top-1/3 right-1/4 w-48 h-48 bg-pop-2/15 blob-shape float-animation pointer-events-none" />
            <div className="fixed bottom-1/3 left-1/4 w-32 h-32 bg-pop-4/15 blob-shape-2 float-animation-delayed pointer-events-none" />

            {/* Scattered Stars - only if requested */}
            {showStars && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {stars.map((star, i) => (
                        <Star
                            key={i}
                            className="absolute text-primary/20"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.size,
                                animationDelay: star.delay,
                            }}
                            fill="currentColor"
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default BackgroundElements;
