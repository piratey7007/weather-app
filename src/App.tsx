import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import About from "./pages/About";
import Weather from "./pages/Weather";
import Forecast from "./pages/Forecast";
import NotFound from "./pages/NotFound";
import Forecasts from "./pages/Forecasts";
import Locations from "./pages/Locations";
import Nav from "./components/Nav";

const Layout = () => (
  <>
    <Outlet />
  </>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/locations" replace />} />
        <Route path="about" element={<About />} />
        <Route path="weather" element={<Weather />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="forecasts" element={<Forecasts />} />
        <Route path="locations" element={<Locations />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
