import { useState, useEffect} from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle,
} from "../../utilities/vehicles-service";
import {
    getLocations,
  } from "../../utilities/locations-service";
  import {
    getCapacities,
  } from "../../utilities/capacities-service";
  import {
    getCapabilities,
  } from "../../utilities/capabilities-service";
  import {
    getBreaks,
  } from "../../utilities/breaks-service";
// import { DataContext } from "../../data/DataContext";
import List from "../../components/List";


const Vehicles = (props) => {
  const [isVehiclesLoading, setIsVehiclesLoading] = useState(true);
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [isCapacitiesLoading, setIsCapacitiesLoading] = useState(true);
  const [isCapabilitiesLoading, setIsCapabilitiesLoading] = useState(true);
  const [isBreaksLoading, setIsBreaksLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [breaks, setBreaks] = useState([]);
  const title=`vehicles`;
  const headers=["name","routing_profile","start_location","end_location","capacities", "capabilities", "earliest_start", "latest_end", "breaks", "loading_policy"];

  async function handleGet() {
    try {
      const vehiclesData = await getVehicles();
      if (vehiclesData.length) {
        setVehicles(vehiclesData);
        setIsVehiclesLoading(false);
      } else {
        setIsVehiclesLoading(false);
        throw Error(vehiclesData);
      }
      const locationsData = await getLocations()
      if (locationsData.length) {
        setLocations(locationsData.map(({ _id, name }) => ({ _id, name })));
        setIsLocationsLoading(false);
      } else {
        setIsLocationsLoading(false);
        throw Error(locationsData);
      }
      const capacitiesData = await getCapacities()
      if (capacitiesData.length) {
        setCapacities(capacitiesData.map(({ _id, name }) => ({ _id, name })));
        setIsCapacitiesLoading(false);
      } else {
        setIsCapacitiesLoading(false);
        throw Error(capacitiesData);
      }
      const capabilitiesData = await getCapabilities()
      if (capabilitiesData.length) {
        setCapabilities(capabilitiesData.map(({ _id, name }) => ({ _id, name })));
        setIsCapabilitiesLoading(false);
      } else {
        setIsCapabilitiesLoading(false);
        throw Error(capabilitiesData);
      }
     const breaksData = await getBreaks()
     if (breaksData.length) {
        setBreaks(breaksData.map(({ _id, name }) => ({ _id, name })))
        setIsBreaksLoading(false);
      } else {
        setIsBreaksLoading(false);
        throw Error(breaksData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCreate(newRow) {
    try {
      await createVehicle(newRow);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteVehicle(id);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editedRow) {
    try {
      await updateVehicle(id, editedRow);
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
        {/* <DataContext.Provider value={locations}> */}
        <List
          inputArray={vehicles}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          headers={headers}
          dropdownLists={{locations,capacities,capabilities, breaks}}
        />
        {/* </DataContext.Provider> */}
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

  return isVehiclesLoading || isCapacitiesLoading || isCapabilitiesLoading || isBreaksLoading || isLocationsLoading ? loading() : loaded();
};

export default Vehicles;