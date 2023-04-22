export default function Moon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
    >
      <mask
        id="mask0_2_1522"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="25"
        y="31"
        width="444"
        height="444"
      >
        <path
          d="M467.903 306.283C468.957 302.192 463.592 299.692 460.779 302.843C426.716 340.987 377.162 365 322 365C219.275 365 136 281.725 136 179C136 122.905 160.832 72.6102 200.102 38.5077C203.292 35.7379 200.867 30.3395 196.762 31.3355C98.1932 55.2499 25 144.077 25 250C25 374.264 125.736 475 250 475C354.829 475 442.914 403.31 467.903 306.283Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_2_1522)">
        <rect
          x="25"
          y="28"
          width="447"
          height="447"
          fill="url(#paint0_linear_2_1522)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2_1522"
          x1="248"
          y1="230"
          x2="43"
          y2="458"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2EBA9" />
          <stop offset="1" stopColor="#C1C435" />
        </linearGradient>
      </defs>
    </svg>
  );
}