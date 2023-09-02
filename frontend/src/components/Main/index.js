import { Routes, Route } from "react-router-dom";
import Locations from "../../pages/Locations/";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Locations />} />
      </Routes>
    </main>
  );
};

export default Main;
