import { useEffect, useState } from "react";
import { useBreakpoint } from "../contexts/BreakpointContext";

export default function useCl() {
  const { isSm } = useBreakpoint();
  const [w, setW] = useState(isSm ? "w-24" : "w-32");
  const [translateX, setTranslateX] = useState(
    isSm ? "translate-x-24" : "translate-x-32",
  );
  const [negTranslateX, setNegTranslateX] = useState(
    isSm ? "-translate-x-24" : "-translate-x-32",
  );

  useEffect(() => {
    if (isSm) {
      setW("w-24");
      setTranslateX("translate-x-24");
      setNegTranslateX("-translate-x-24");
    } else {
      setW("w-32");
      setTranslateX("translate-x-32");
      setNegTranslateX("-translate-x-32");
    }
  }, [isSm]);

  return { w, translateX, negTranslateX };
}
