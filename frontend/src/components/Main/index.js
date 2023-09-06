import { Routes, Route } from "react-router-dom";
import Locations from "../../pages/Locations/";
import Settings from "../../pages/Settings";
import NotFound404 from '../../pages/NotFound404'

const Main = () => {
  return (
    <main className="flex-grow bg-white flex flex-col items-start max-w-7xl p-6 lg:px-8 mx-auto">
      <Routes>
        <Route path="/locations" element={<Locations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<NotFound404/>}/>
      </Routes>
    </main>
  );
};

export default Main;
