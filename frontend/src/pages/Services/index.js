import { useState, useEffect} from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "../../utilities/services-service";
import {
    getLocations,
  } from "../../utilities/locations-service";
  import {
    getCapabilities,
  } from "../../utilities/capabilities-service";
import List from "../../components/List";


const Services = (props) => {
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [isCapabilitiesLoading, setIsCapabilitiesLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const title=`services`;
  const headers=["name","location","duration","requirements","earliest", "latest", "type"];

  async function handleGet() {
    try {
      const servicesData = await getServices();
        setServices(servicesData);
        setIsServicesLoading(false);

      const locationsData = await getLocations()
        setLocations(locationsData.map(({ _id, name }) => ({ _id, name })));
        setIsLocationsLoading(false);
      const capabilitiesData = await getCapabilities()
        setCapabilities(capabilitiesData.map(({ _id, name }) => ({ _id, name })));
        setIsCapabilitiesLoading(false);

    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCreate(newRow) {
    try {
      await createService(newRow);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteService(id);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editedRow) {
    try {
      await updateService(id, editedRow);
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
          inputArray={services}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          headers={headers}
          dropdownLists={{locations,capabilities}}
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

  return isServicesLoading || isCapabilitiesLoading || isLocationsLoading ? loading() : loaded();
};

export default Services;