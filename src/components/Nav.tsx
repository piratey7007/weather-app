import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [className, setClassName] = useState({
    ul: "",
    main: "flex justify-center items-center w-24",
    mid: "text-xl opacity-100",
    subst: "opacity-50 text-base",
    suben: "opacity-50 text-base",
    outst: "opacity-0",
    outen: "opacity-0",
  });
  const [direction, setDirection] = useState<"left" | "right">();

  async function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    direction?: "left" | "right",
  ) {
    e.preventDefault();
    setDirection(direction);
    if (!direction) return;
    const path = e.currentTarget.getAttribute("href")!;
    navigate(path);
    if (direction) {
      setClassName({
        ul: direction === "left" ? "translate-x-24" : "-translate-x-24",
        main: "flex justify-center items-center w-24",
        mid: "text-base opacity-50",
        subst: "opacity-0 text-base",
        suben: "opacity-100 text-xl",
        outst: "opacity-0",
        outen: "opacity-50",
      });
      await sleep(0);
      setClassName({
        ul: "transition-all duration-500",
        main: "flex justify-center items-center w-24 transition-all duration-500",
        mid: "text-xl opacity-100",
        subst: "opacity-50 text-base",
        suben: "opacity-50 text-base",
        outst: "opacity-0",
        outen: "opacity-0",
      });
    }
  }

  return (
    <nav className={`flex w-full justify-center ${className.ul}`}>
      <LocationsPath
        handleClick={handleClick}
        className={className}
        direction={direction}
      />
      <ForecastsPath
        handleClick={handleClick}
        className={className}
        direction={direction}
      />
    </nav>
  );
}

function LocationsPath({ handleClick, className, direction }: any) {
  if (location.pathname.startsWith("/locations")) {
    return (
      <>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.outst : className.outen
          }`}
          to="/locations"
          onClick={(e) => handleClick(e)}
        >
          locations
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.subst : className.suben
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e, "right")}
        >
          forecasts
        </Link>
        <Link
          className={`${className.main} ${className.mid}`}
          to="/locations"
          onClick={(e) => handleClick(e)}
        >
          locations
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.suben : className.subst
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e, "left")}
        >
          forecasts
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.outen : className.outst
          }`}
          to="/locations"
          onClick={(e) => handleClick(e)}
        >
          locations
        </Link>
      </>
    );
  }
  return null;
}

function ForecastsPath({ handleClick, className, direction }: any) {
  if (location.pathname.startsWith("/forecasts")) {
    return (
      <>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.outst : className.outen
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e)}
        >
          forecasts
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.subst : className.suben
          }`}
          to="/locations"
          onClick={(e) => handleClick(e, "right")}
        >
          locations
        </Link>
        <Link
          className={`${className.main} ${className.mid}`}
          to="/forecasts"
          onClick={(e) => handleClick(e)}
        >
          forecasts
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.suben : className.subst
          }`}
          to="/locations"
          onClick={(e) => handleClick(e, "left")}
        >
          locations
        </Link>
        <Link
          className={`${className.main} ${
            direction === "right" ? className.outen : className.outst
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e)}
        >
          forecasts
        </Link>
      </>
    );
  }
  return null;
}
