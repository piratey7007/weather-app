import { useState, createContext, useContext, useEffect } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface BreakpointContextI {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
}

export const BreakpointContext = createContext({} as BreakpointContextI);

export function BreakpointProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSm, setIsSm] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(false);

  function handleResize() {
    function resize() {
      const isSmL = window.innerWidth < 640;
      const isMdL = window.innerWidth >= 640 && window.innerWidth < 768;
      const isLgL = window.innerWidth >= 768;
      if (isSmL !== isSm) setIsSm(isSmL);
      if (isMdL !== isMd) setIsMd(isMdL);
      if (isLgL !== isLg) setIsLg(isLgL);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }

  useEffect(handleResize, [window.innerWidth]);

  return (
    <BreakpointContext.Provider
      value={{
        isSm,
        isMd,
        isLg,
      }}
    >
      {children}
    </BreakpointContext.Provider>
  );
}

export function useBreakpoint() {
  return useContext(BreakpointContext);
}
