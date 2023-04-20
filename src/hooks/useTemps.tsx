import { useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";

export default function useTemp(temperatures: [number, number, number]) {
  const { sign } = useSettings();
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  function getTemp(temp: number) {
    if (sign === "C") return Math.round(temp - 273.15);
    return Math.round((temp - 273.15) * (9 / 5) + 32);
  }
  function set() {
    setNumber(getTemp(temperatures[0]));
    setNumber2(getTemp(temperatures[1]));
    setNumber3(getTemp(temperatures[2]));
  }
  useEffect(set, [temperatures, sign]);

  return { numbers: [number, number2, number3] };
}
