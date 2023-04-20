import { useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";

export default function useTemp(temperature: number) {
  const { sign } = useSettings();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (sign === "C") setNumber(Math.round(temperature - 273.15));
    if (sign === "F") setNumber(Math.round((temperature - 273.15) * 1.8 + 32));
  }, [temperature, sign]);

  return { number, sign };
}
