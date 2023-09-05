import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
} from "../../utilities/locations-service";
import LocationList from "../../components/LocationList";

const Locations = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  async function handleRequest() {
    try {
      const locationsData = await getLocations();
      if (locationsData.length) {
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

  async function handleSubmit(newRow) {
    try {
      await createLocation(newRow);
      handleRequest();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      //   console.log(id)
      await deleteLocation(id);
      handleRequest();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editRow) {
    try {
      await updateLocation(id, editRow);
      handleRequest();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const loaded = () => {
    return (
      <>
        <LocationList
          locations={locations}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
        {/* <div>
          <Alert type="success" message="This is a success message." />
          <Alert type="error" message="This is an error message." />
          <Alert type="warning" message="This is a warning message." />
          <Alert type="info" message="This is an info message." />
        </div> */}
      </>
    );
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
