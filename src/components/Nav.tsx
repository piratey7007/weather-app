import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [direction, setDirection] = useState<"left" | "right">();

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    direction?: "left" | "right",
  ) {
    e.preventDefault();
    setDirection(direction);
    if (!direction) return;
    const path = e.currentTarget.getAttribute("href")!;
    navigate(path);
  }

  return (
    <nav className="flex">
      <LocationsPath
        handleClick={handleClick}
        className={className}
        setClassName={setClassName}
      />
      <ForecastsPath
        handleClick={handleClick}
        className={className}
        setClassName={setClassName}
      />
    </nav>
  );
}

function LocationsPath({
  handleClick,
  className,
  setClassName,
  direction,
}: any) {
  async function handleClickLocal(
    e: React.MouseEvent<HTMLAnchorElement>,
    direction?: "left" | "right",
  ) {
    handleClick(e, direction);
    if (direction) {
      setClassName({
        main:
          (direction === "left" ? "translate-x-full" : "-translate-x-full") +
          " text-base",
        sub: direction === "left" ? "translate-x-full" : "-translate-x-full",
      });
      await sleep(1000);
      setClassName({ main: "transition-all duration-500", sub: "" });
      await sleep(1000);
      setClassName({ main: "", sub: "" });
    }
  }

  if (location.pathname.startsWith("/locations")) {
    return (
      <>
        <Link
          className={`${className.main} ${
            direction === "left" ? className.sub : ""
          }`}
          to="/forecasts"
          onClick={(e) => handleClickLocal(e, "right")}
        >
          Forecasts
        </Link>
        <Link
          className={`${className.main} text-xl`}
          to="/locations"
          onClick={(e) => handleClickLocal(e)}
        >
          Locations
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.sub : ""
          }`}
          to="/forecasts"
          onClick={(e) => handleClickLocal(e, "left")}
        >
          Forecasts
        </Link>
      </>
    );
  }
  return null;
}

function ForecastsPath({
  handleClick,
  className,
  setClassName,
  direction,
}: any) {
  async function handleClickLocal(
    e: React.MouseEvent<HTMLAnchorElement>,
    direction?: "left" | "right",
  ) {
    handleClick(e, direction);
    if (direction) {
      setClassName({
        main:
          (direction === "left" ? "translate-x-full" : "-translate-x-full") +
          " text-base",
        sub: direction === "left" ? "translate-x-full" : "-translate-x-full",
      });
      await sleep(1000);
      setClassName({ main: "transition-all duration-500", sub: "" });
      await sleep(1000);
      setClassName({ main: "", sub: "" });
    }
  }

  if (location.pathname.startsWith("/forecasts")) {
    return (
      <>
        <Link
          className={`${className.main} ${
            direction === "left" ? className.sub : ""
          }`}
          to="/locations"
          onClick={(e) => handleClickLocal(e, "right")}
        >
          Locations
        </Link>
        <Link
          className={`${className.main} text-xl`}
          to="/forecasts"
          onClick={(e) => handleClickLocal(e)}
        >
          Forecasts
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.sub : ""
          }`}
          to="/locations"
          onClick={(e) => handleClickLocal(e, "left")}
        >
          Locations
        </Link>
      </>
    );
  }
  return null;
}
