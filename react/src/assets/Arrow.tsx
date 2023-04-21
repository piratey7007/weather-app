import arrow from "../svg/arrow.svg";

export default function Arrow({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  if (direction !== "left" && direction !== "right") {
    console.error("Arrow direction must be 'left' or 'right'");
    return null;
  }
  return (
    <svg
      width="0"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${direction === "left" ? "rotate-180" : ""} ${className}`}
    >
      <rect
        x="125.165"
        y="100.382"
        width="70.2269"
        height="280.908"
        rx="11"
        transform="rotate(-45 125.165 100.382)"
        fill="white"
      />
      <rect
        x="324.342"
        y="200.151"
        width="70.2269"
        height="280.908"
        rx="11"
        transform="rotate(45 324.342 200.151)"
        fill="white"
      />
    </svg>
  );
}
