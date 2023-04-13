export default function Mist({ className = "" }) {
  return (
    <svg
      width="0"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <rect width="500" height="500" fill="black" />
      <path
        d="M67 195H324"
        stroke="white"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M189 250L211 250"
        stroke="white"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M277 305L357 305"
        stroke="white"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M248 250L433 250"
        stroke="white"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M82 305H240"
        stroke="white"
        strokeWidth="20"
        strokeLinecap="round"
      />
    </svg>
  );
}
