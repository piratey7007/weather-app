import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type SettingsContextType = {
  sign: string;
  toggleSign: () => void;
};

const SettingsContext = createContext<SettingsContextType>({
  sign: "C",
  toggleSign: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [sign, setSign] = useState("C");

  useEffect(() => {
    const sign = localStorage.getItem("sign");
    if (sign) setSign(sign);
  }, []);

  useEffect(() => {
    localStorage.setItem("sign", sign);
  }, [sign]);

  function toggleSign() {
    setSign((sign) => (sign === "C" ? "F" : "C"));
  }

  return (
    <SettingsContext.Provider value={{ sign, toggleSign }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
