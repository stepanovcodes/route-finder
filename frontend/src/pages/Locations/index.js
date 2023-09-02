import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import { getLocations } from "../../utilities/locations-service";
import "./Locations.css";

const Locations = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  async function handleRequest() {
    try {
      const locationsData = await getLocations();
      if (locationsData.length) {
        // console.log(locationsData);
        setLocations(locationsData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw Error(locationsData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const loaded = () => {
    return (
      <section className="locations-list">
        {locations?.map((location) => {
          return (
            <div key={location._id}>
              <h3>{location.name}</h3>
              <p>{location.coordinates}</p>
            </div>
          );
        })}
      </section>
    );
  };

  const loading = () => (
    <Spinner
      labelPosition="below"
      label="Getting things ready..."
      size="huge"
    />
  );

  return isLoading ? loading() : loaded();
};

export default Locations;
