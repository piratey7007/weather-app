import ListItem from "../components/ListItem";
import Nav from "../components/Nav";

export default function Locations() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Nav />
      <ul className="flex w-full flex-col items-center gap-2">
        <ListItem
          item={{
            title: "London",
            high: 300,
            low: 283,
            temperature: 292,
            description: "clear sky",
          }}
        />
      </ul>
    </div>
  );
}
