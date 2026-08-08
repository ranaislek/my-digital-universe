import React from "react";

interface FrogLogoProps {
  className?: string;
  useQueen?: boolean;
}

export const FrogLogo: React.FC<FrogLogoProps> = ({
  className = "",
  useQueen = true,
}) => {
  const logoSrc = useQueen ? "/frog-queen-transparent.png" : "/rana-frog-transparent.png";

  return (
    <div className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* User's Original Queen Frog Graphic with 100% Transparent Background */}
      <img
        src={logoSrc}
        alt="Rana Frog"
        className="h-15 md:h-20 max-h-[68px] md:max-h-[74px] w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-md"
      />

      {/* Elegant Typography: "rana." */}
      <span className="font-serif font-bold tracking-tight text-foreground text-3xl md:text-4xl transition-colors group-hover:text-primary">
        rana<span className="text-primary font-sans font-bold">.</span>
      </span>
    </div>
  );
};

export default FrogLogo;
