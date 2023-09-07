import { useState, useEffect} from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getProblems,
  createProblem,
  deleteProblem,
  updateProblem,
} from "../../utilities/problems-service";
import {
    getLocations,
  } from "../../utilities/locations-service";
  import {
    getVehicles,
  } from "../../utilities/vehicles-service";
  import {
    getServices,
  } from "../../utilities/services-service";
  import {
    getShipments,
  } from "../../utilities/shipments-service";
import List from "../../components/List";


const Problems = (props) => {
  const [isProblemsLoading, setIsProblemsLoading] = useState(true);
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [isVehiclesLoading, setIsVehiclesLoading] = useState(true);
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [isShipmentsLoading, setIsShipmentsLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [shipments, setShipments] = useState([]);
  const title=`problems`;
  const headers=["name","vehicles","services","shipments","objectives","version"];

  async function handleGet() {
    try {
      const problemsData = await getProblems();
      if (problemsData.length) {
        setProblems(problemsData);
        setIsProblemsLoading(false);
      } else {
        setIsProblemsLoading(false);
        throw Error(problemsData);
      }
      const locationsData = await getLocations()
      if (locationsData.length) {
        setLocations(locationsData.map(({ _id, name }) => ({ _id, name })));
        setIsLocationsLoading(false);
      } else {
        setIsLocationsLoading(false);
        throw Error(locationsData);
      }
      const vehiclesData = await getVehicles()
      if (vehiclesData.length) {
        setVehicles(vehiclesData.map(({ _id, name, start_location, end_location }) => ({ _id, name,start_location, end_location })));
        setIsVehiclesLoading(false);
      } else {
        setIsVehiclesLoading(false);
        throw Error(vehiclesData);
      }
      const servicesData = await getServices()
      if (servicesData.length) {
        setServices(servicesData.map(({ _id, name, location }) => ({ _id, name, location })));
        setIsServicesLoading(false);
      } else {
        setIsServicesLoading(false);
        throw Error(servicesData);
      }
      const shipmentsData = await getShipments()
      if (shipmentsData.length) {
        setShipments(shipmentsData.map(({ _id, name, from, to }) => ({ _id, name, from, to })));
        setIsShipmentsLoading(false);
      } else {
        setIsShipmentsLoading(false);
        throw Error(shipmentsData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCreate(newRow) {
    try {
      await createProblem(newRow);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProblem(id);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editedRow) {
    try {
      await updateProblem(id, editedRow);
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
          inputArray={problems}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          headers={headers}
          dropdownLists={{locations, vehicles, services, shipments}}
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

  return isProblemsLoading || isLocationsLoading || isVehiclesLoading || isServicesLoading || isShipmentsLoading ? loading() : loaded();
};

export default Problems;