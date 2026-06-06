type MarqueeProps = {
  items: React.ReactNode[];
  /** Animation duration in seconds. Lower = faster. */
  speed?: number;
  /** Whether to reverse direction. */
  reverse?: boolean;
};

/**
 * Pure-CSS infinite marquee. Renders the item list twice so the translate
 * loops seamlessly. Pause-on-hover handled in globals.css.
 */
export function Marquee({ items, speed = 38, reverse = false }: MarqueeProps) {
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
