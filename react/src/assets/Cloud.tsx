export default function Cloud({ className = "" }) {
  return (
    <svg
      width="0"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <mask
        id="mask0_2_376"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="113"
        width="500"
        height="274"
      >
        <ellipse
          cx="90.2778"
          cy="312.846"
          rx="90.2778"
          ry="73.3025"
          fill="black"
        />
        <ellipse
          cx="216.049"
          cy="240.315"
          rx="145.062"
          ry="127.315"
          fill="black"
        />
        <ellipse
          cx="383.488"
          cy="284.296"
          rx="116.512"
          ry="101.852"
          fill="black"
        />
        <rect
          x="89.5062"
          y="258.062"
          width="293.21"
          height="128.086"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_2_376)">
        <rect
          y="113"
          width="500"
          height="273.148"
          fill="url(#paint0_linear_2_376)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2_376"
          x1="309.414"
          y1="126.117"
          x2="188.272"
          y2="374.574"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D6DEDF" />
          <stop offset="1" stopColor="#93A3AE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
