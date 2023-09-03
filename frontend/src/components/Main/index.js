import { Routes, Route } from "react-router-dom";
import Locations from "../../pages/Locations/";
import _404 from '../../pages/_404'

const Main = () => {
  return (
    <main className="flex-grow bg-white">
      <Routes>
        <Route path="/locations" element={<Locations />} />
        <Route path="/*" element={<_404/>}/>
      </Routes>
    </main>
  );
};

export default Main;
