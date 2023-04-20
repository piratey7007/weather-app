import { useSettings } from "../contexts/SettingsContext";
import useIcon from "../hooks/useIcon";
import useTemp from "../hooks/useTemp";

export default function ListItem({
  item: { title, high, low, description, temperature },
}: {
  item: {
    title: string;
    high: number;
    low: number;
    description: string;
    temperature: number;
  };
}) {
  const Icon = useIcon(description);
  const { number } = useTemp(temperature);
  const { number: highNumber } = useTemp(temperature);
  const { number: lowNumber } = useTemp(temperature);
  const { toggleSign, sign } = useSettings();
  return (
    <li className="flex justify-between">
      <div className="flex flex-col justify-between">
        <h3>{title}</h3>
        <div className="flex">
          <h3>H {highNumber}°</h3>
          <h3>L {lowNumber}°</h3>
        </div>
      </div>
      <div className="flex justify-end">
        <Icon />
        <div className="flex">
          <h1>{number}°</h1>
          <div onClick={toggleSign} className="flex flex-col">
            <h1>{sign}</h1>
            <hr />
            <h3>{sign === "C" ? "F" : "C"}</h3>
          </div>
        </div>
      </div>
    </li>
  );
}
