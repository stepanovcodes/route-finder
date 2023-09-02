import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import "./Locations.css"

const Locations = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  const BASE_URL = "http://localhost:4000/locations";

  const getLocations = async () => {
    try {
      const response = await fetch(BASE_URL);
      const allLocations = await response.json();
      setLocations(allLocations);
      setIsLoading(false);
    } catch (err) {
      console.log({ error: err.message });
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const loaded = () => {
    return locations?.map((location) => {
      return (
        <div key={location._id}>
          <h3>{location.name}</h3>
          <p>{location.coordinates}</p>
        </div>
      );
    });
  };

  const loading = () => (
    <div className="locations-list">
      <Spinner labelPosition="below" label="Getting things ready..." size="huge" />
    </div>
  );

  return (
    <section className="locations-list">
      {isLoading ? loading() : loaded()}
    </section>
  );
};

export default Locations;
