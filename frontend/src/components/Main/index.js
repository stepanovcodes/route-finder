import { Routes, Route } from "react-router-dom";
import Locations from "../../pages/Locations/";
import Capacities from "../../pages/Capacities/";
import NotFound404 from '../../pages/NotFound404'

const Main = () => {
  return (
    // max-w-7xl mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8
    <main className="flex-grow bg-white flex flex-col max-w-7xl items-center p-6 lg:px-8 mx-auto">
      <Routes>
        <Route path="/locations" element={<Locations />} />
        <Route path="/settings" element={<Capacities />} />
        <Route path="/*" element={<NotFound404/>}/>
      </Routes>
    </main>
  );
};

export default Main;
