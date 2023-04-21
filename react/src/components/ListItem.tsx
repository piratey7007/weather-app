import { useSettings } from "../contexts/SettingsContext";
import useIcon from "../hooks/useIcon";
import useTemps from "../hooks/useTemps";

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
  const {
    numbers: [t, h, l],
  } = useTemps([temperature, high, low]);
  const { toggleSign, sign } = useSettings();
  return (
    <li className="flex w-[24rem] max-w-[95%] cursor-pointer justify-between rounded-xl bg-white bg-opacity-[17%] p-4 transition-all duration-200 hover:bg-opacity-25">
      <div className="flex flex-col justify-between">
        <h3>{title}</h3>
        <div className="flex">
          <h4>H {h}°</h4>
          <h4>L {l}°</h4>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Icon className="w-16" />
        <div className="flex">
          <h2>{t}°</h2>
          <div onClick={toggleSign} className="flex flex-col items-center">
            <h2>{sign}</h2>
            <hr />
            <h4>{sign === "C" ? "F" : "C"}</h4>
          </div>
        </div>
      </div>
    </li>
  );
}
