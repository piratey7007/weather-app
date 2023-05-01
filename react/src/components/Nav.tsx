import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBreakpoint } from "../contexts/BreakpointContext";
import useCl from "../hooks/useCl";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Nav() {
  const location = useLocation();
  const { isSm } = useBreakpoint();
  const { w, translateX, negTranslateX } = useCl();
  const navigate = useNavigate();
  const [className, setClassName] = useState({
    ul: "",
    main: `flex justify-center items-center transition-all duration-500`,
    w,
    translateX,
    negTranslateX,
    mid: "fluid-lg opacity-100",
    subst: "opacity-50 fluid-base",
    suben: "opacity-50 fluid-base",
    outst: "opacity-0 fluid-base",
    outen: "opacity-0 fluid-base",
  });
  const [direction, setDirection] = useState<"left" | "right">();

  useEffect(() => {
    setClassName((prev) => ({
      ...prev,
      w,
      translateX,
      negTranslateX,
    }));
  }, [isSm, w, translateX, negTranslateX]);

  async function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    direction?: "left" | "right"
  ) {
    e.preventDefault();
    setDirection(direction);
    if (!direction) return;
    const path = e.currentTarget.getAttribute("href")!;
    navigate(path);
    if (direction) {
      setClassName({
        ul: direction === "left" ? translateX : negTranslateX,
        main: `flex justify-center items-center`,
        w,
        translateX,
        negTranslateX,
        mid: "fluid-base opacity-50",
        subst: "opacity-0 fluid-base",
        suben: "opacity-100 fluid-lg",
        outst: "opacity-0 fluid-base",
        outen: "opacity-50 fluid-base",
      });
      await sleep(0);
      setClassName({
        ul: "transition-all duration-500",
        main: `flex justify-center items-center transition-all duration-500`,
        w,
        translateX,
        negTranslateX,
        mid: "fluid-lg opacity-100",
        subst: "opacity-50 fluid-base",
        suben: "opacity-50 fluid-base",
        outst: "opacity-0 fluid-base",
        outen: "opacity-0 fluid-base",
      });
    }
  }

  return (
    <nav
      className={`flex h-fit w-full min-w-fit justify-center ${className.ul}`}
    >
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
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.outst : className.outen
          }`}
          to="/locations"
          onClick={(e) => handleClick(e)}
        >
          Locations
        </Link>
        <Link
          className={`${className.main} ${className.w} ${className.w} ${
            direction === "right" ? className.subst : className.suben
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e, "right")}
        >
          Forecasts
        </Link>
        <Link
          className={`${className.main} ${className.w} ${className.mid}`}
          to="/locations"
          onClick={(e) => handleClick(e)}
        >
          Locations
        </Link>
        <Link
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.suben : className.subst
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e, "left")}
        >
          Forecasts
        </Link>
        <Link
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.outen : className.outst
          }`}
          to="/locations"
          onClick={(e) => handleClick(e)}
        >
          Locations
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
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.outst : className.outen
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e)}
        >
          Forecasts
        </Link>
        <Link
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.subst : className.suben
          }`}
          to="/locations"
          onClick={(e) => handleClick(e, "right")}
        >
          Locations
        </Link>
        <Link
          className={`${className.main} ${className.w} ${className.mid}`}
          to="/forecasts"
          onClick={(e) => handleClick(e)}
        >
          Forecasts
        </Link>
        <Link
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.suben : className.subst
          }`}
          to="/locations"
          onClick={(e) => handleClick(e, "left")}
        >
          Locations
        </Link>
        <Link
          className={`${className.main} ${className.w} ${
            direction === "right" ? className.outen : className.outst
          }`}
          to="/forecasts"
          onClick={(e) => handleClick(e)}
        >
          Forecasts
        </Link>
      </>
    );
  }
  return null;
}
