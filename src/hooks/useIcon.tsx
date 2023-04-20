import Icon from "../assets/Icon";

function check(description: string) {
  return (
    description.includes("clear sky") ||
    description.includes("few clouds") ||
    description.includes("scattered clouds") ||
    description.includes("broken clouds") ||
    description.includes("shower rain") ||
    description.includes("rain") ||
    description.includes("thunderstorm") ||
    description.includes("snow") ||
    description.includes("mist")
  );
}

export default function useIcon(description: string) {
  if (!check(description)) return () => null;
  const props = {} as any;
  if (
    description.includes("few clouds") ||
    description.includes("scattered clouds") ||
    description.includes("broken clouds")
  )
    props.clouds = true;
  if (
    description.includes("shower rain") ||
    description.includes("rain") ||
    description.includes("thunderstorm")
  )
    props.rain = true;
  if (description.includes("thunderstorm")) props.lightning = true;
  if (description.includes("snow")) props.snow = true;
  if (description.includes("mist")) props.mist = true;
  return (): JSX.Element => <Icon {...props} />;
}
