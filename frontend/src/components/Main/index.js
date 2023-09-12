import { Routes, Route } from "react-router-dom";
import Locations from "../../pages/Locations/";
import Settings from "../../pages/Settings";
import NotFound404 from "../../pages/NotFound404";
import Vehicles from "../../pages/Vehicles";
import Services from "../../pages/Services";
import Shipments from "../../pages/Shipments";
import Problems from "../../pages/Problems";
import Solutions from "../../pages/Solutions";
import Home from "../../pages/Home";

const Main = () => {
  return (
    <main className="flex-grow bg-white flex flex-col items-start max-w-7xl p-6 lg:px-8 mx-auto">
      <Routes>
        <Route path="/locations" element={<Locations />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shipments" element={<Shipments />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </main>
  );
};

export default Main;
