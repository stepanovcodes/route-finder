import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import { getLocations } from "../../utilities/locations-service";
import LocationList from '../../components/LocationList'
import Empty from '../../components/Empty'

const Locations = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const title = "Locations";

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
    return locations ? <LocationList locations={locations} /> : <Empty title={title} />
  };

  const loading = () => (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Spinner
        labelPosition="below"
        label="Getting locations ready..."
        // size="huge"
      />
    </div>
  );

  return isLoading ? loading() : loaded();
};

export default Locations;
