import { useState, useEffect} from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getShipments,
  createShipment,
  deleteShipment,
  updateShipment,
} from "../../utilities/shipments-service";
import {
    getLocations,
  } from "../../utilities/locations-service";
  import {
    getCapabilities,
  } from "../../utilities/capabilities-service";
import List from "../../components/List";


const Shipments = (props) => {
  const [isShipmentsLoading, setIsShipmentsLoading] = useState(true);
  const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [isCapabilitiesLoading, setIsCapabilitiesLoading] = useState(true);
  const [shipments, setShipments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const title=`shipments`;
  const headers=["name","from","to","weight","volume","boxes","requirements", "pickup_duration","dropoff_duration","earliest_pickup", "latest_pickup", "type_pickup","earliest_dropoff", "latest_dropoff", "type_dropoff"];

  async function handleGet() {
    try {
      const shipmentsData = await getShipments();
      if (shipmentsData.length) {
        setShipments(shipmentsData);
        setIsShipmentsLoading(false);
      } else {
        setIsShipmentsLoading(false);
        throw Error(shipmentsData);
      }
      const locationsData = await getLocations()
      if (locationsData.length) {
        setLocations(locationsData.map(({ _id, name }) => ({ _id, name })));
        setIsLocationsLoading(false);
      } else {
        setIsLocationsLoading(false);
        throw Error(locationsData);
      }
      const capabilitiesData = await getCapabilities()
      if (capabilitiesData.length) {
        setCapabilities(capabilitiesData.map(({ _id, name }) => ({ _id, name })));
        setIsCapabilitiesLoading(false);
      } else {
        setIsCapabilitiesLoading(false);
        throw Error(capabilitiesData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCreate(newRow) {
    try {
      await createShipment(newRow);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteShipment(id);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editedRow) {
    try {
      await updateShipment(id, editedRow);
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
          inputArray={shipments}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          headers={headers}
          dropdownLists={{locations,capabilities}}
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

  return isShipmentsLoading || isCapabilitiesLoading || isLocationsLoading ? loading() : loaded();
};

export default Shipments;