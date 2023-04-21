import Moon from "./Moon";
import Sun from "./Sun";
import { useDayNight } from "../contexts/LocalContext";

export default function Orb({ className = "" }) {
  const { isDay } = useDayNight();
  if (isDay) return <Sun className={className} />;
  return <Moon className={className} />;
}
