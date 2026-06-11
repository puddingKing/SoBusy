import { useRef, type CSSProperties, type ReactNode } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  style,
  spotlightColor = "rgba(180, 151, 207, 0.2)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      style={
        {
          "--spotlight-color": spotlightColor,
          ...style,
        } as CSSProperties
      }
    >
      <div className="card-spotlight-content">{children}</div>
    </div>
  );
}
