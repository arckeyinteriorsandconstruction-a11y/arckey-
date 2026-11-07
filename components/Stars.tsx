const PATH = "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8L12 3.5z";

export default function Stars({ value, size = 18, className = "text-marigold-dark" }: { value: number; size?: number; className?: string }) {
  const rounded = Math.round(value);
  const label = Number.isInteger(value) ? `${value}` : value.toFixed(1);
  return (
    <span role="img" aria-label={`${label} out of 5 stars`} className={`inline-flex gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={PATH} />
        </svg>
      ))}
    </span>
  );
}
