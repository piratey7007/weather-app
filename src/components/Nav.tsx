import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const ref = useRef<HTMLUListElement>(null);
  const [links, setLinks] = useState([
    { name: "Locations", path: "/locations" },
    { name: "Forecasts", path: "/forecasts" },
  ]);
  function handleClick() {
    console.log("clicked");
  }

  function transitionLinks() {
    for (const li of ref.current?.children as HTMLCollectionOf<HTMLElement>) {
      li.classList.add("translate-");
    }
  }

  function rotateLinks(dir: "left" | "right") {
    const [first, ...rest] = links;
    setLinks([...rest, first]);
    transitionLinks();
  }

  function check() {
    console.log("Checked");
    if (links.length < 3) setLinks([...links, ...links]);
  }

  useEffect(() => {
    check();
    if (location.pathname !== links[0].path) rotateLinks("left");
    console.log("location changed");
  }, [location]);

  useEffect(() => {
    check();
    console.log("links changed");
  }, [links]);

  return (
    <nav>
      <ul ref={ref} className="flex gap-4">
        {links.map(({ name, path }, i) => (
          <li key={path + i}>
            <Link to={path} onClick={handleClick}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
