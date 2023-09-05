import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getLocations,
  createLocation,
  deleteLocation,
  updateLocation,
} from "../../utilities/locations-service";
import List from "../../components/List";

const Locations = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const title=`locations`;
  const headers=["name","latitude","longitude"];

  async function handleGet() {
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

  async function handleCreate(newRow) {
    try {
      await createLocation({
        name: newRow.name,
        coordinates: [newRow.longitude, newRow.latitude],
      });
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteLocation(id);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editedRow) {
    try {
      await updateLocation(id, {
        name: editedRow.name,
        coordinates: [editedRow.longitude, editedRow.latitude],
      });
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

  const loaded = () => {
    return (
      <>
        <h1 className="text-2xl font-bold tracking-tight">{title.toUpperCase()}</h1>
        <List
          inputArray={locations}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          headers={headers}
        />
      </>
    );
  };

  const loading = () => (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Spinner
        labelPosition="below"
        label={`Getting ${title} ready...`}
      />
    </div>
  );

  return isLoading ? loading() : loaded();
};

export default Locations;
