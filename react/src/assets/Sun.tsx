export default function Sun({ className = "" }) {
  return (
    <svg
      width="0"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <mask
        id="mask0_2_1295"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="25"
        y="25"
        width="450"
        height="450"
      >
        <circle
          cx="250"
          cy="250"
          r="125"
          transform="rotate(-45 250 250)"
          fill="white"
        />
        <path
          d="M90.9009 90.9008L168.429 119.439L119.439 168.429L90.9009 90.9008Z"
          fill="white"
        />
        <path
          d="M409.099 409.099L331.571 380.561L380.561 331.571L409.099 409.099Z"
          fill="white"
        />
        <path d="M250 25L284.641 100L215.359 100L250 25Z" fill="white" />
        <path d="M250 475L215.359 400L284.641 400L250 475Z" fill="white" />
        <path
          d="M409.099 90.901L380.561 168.429L331.571 119.439L409.099 90.901Z"
          fill="white"
        />
        <path
          d="M90.901 409.099L119.439 331.571L168.429 380.561L90.901 409.099Z"
          fill="white"
        />
        <path d="M475 250L400 284.641L400 215.359L475 250Z" fill="white" />
        <path
          d="M25.0001 250L100 215.359L100 284.641L25.0001 250Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_2_1295)">
        <rect
          x="25"
          y="25"
          width="450"
          height="450"
          fill="url(#paint0_radial_2_1295)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_2_1295"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(251.75 248.75) rotate(134.91) scale(224.86)"
        >
          <stop offset="0.265625" stopColor="#FDDF3D" />
          <stop offset="0.609375" stopColor="#E8D25D" />
          <stop offset="1" stopColor="#F6E176" />
        </radialGradient>
      </defs>
    </svg>
  );
}