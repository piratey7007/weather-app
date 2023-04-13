import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import About from "./pages/About";
import Weather from "./pages/Weather";
import Forecast from "./pages/Forecast";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";

const Layout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/weather" replace />} />
        <Route path="about" element={<About />} />
        <Route path="weather" element={<Weather />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
