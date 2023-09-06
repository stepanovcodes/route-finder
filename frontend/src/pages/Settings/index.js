import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getCapacities,
  createCapacity,
  deleteCapacity,
  updateCapacity,
} from "../../utilities/capacities-service";
import {
  getCapabilities,
  createCapability,
  deleteCapability,
  updateCapability,
} from "../../utilities/capabilities-service";
import {
  getBreaks,
  createBreak,
  deleteBreak,
  updateBreak,
} from "../../utilities/breaks-service";
import List from "../../components/List";

const Settings = (props) => {
  const [isCapacitiesLoading, setIsCapacitiesLoading] = useState(true);
  const [isCapabilitiesLoading, setIsCapabilitiesLoading] = useState(true);
  const [isBreaksLoading, setIsBreaksLoading] = useState(true);
  const [capacities, setCapacities] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [breaks, setBreaks] = useState([]);
  const titleCapacities = `capacities`;
  const titleCapabilities = `capabilities`;
  const titleBreaks = `breaks`;
  const headersCapacities = ["name", "volume", "weight", "boxes"];
  const headersCapabilities = ["name"];
  const headersBreaks = ["name", "earliest_start", "latest_end", "duration"];

  async function handleCapacitiesGet() {
    try {
      const capacitiesData = await getCapacities();
      if (capacitiesData.length) {
        setCapacities(capacitiesData);
        setIsCapacitiesLoading(false);
      } else {
        setIsCapacitiesLoading(false);
        throw Error(capacitiesData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapabilitiesGet() {
    try {
      const capabilitiesData = await getCapabilities();
      if (capabilitiesData.length) {
        setCapabilities(capabilitiesData);
        setIsCapabilitiesLoading(false);
      } else {
        setIsCapabilitiesLoading(false);
        throw Error(capabilitiesData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleBreaksGet() {
    try {
      const breaksData = await getBreaks();
      if (breaksData.length) {
        setBreaks(breaksData);
        setIsBreaksLoading(false);
      } else {
        setIsBreaksLoading(false);
        throw Error(breaksData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapacityCreate(newRow) {
    try {
      await createCapacity(newRow);
      handleCapacitiesGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapabilityCreate(newRow) {
    try {
      await createCapability(newRow);
      handleCapabilitiesGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleBreakCreate(newRow) {
    try {
      await createBreak(newRow);
      handleBreaksGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapacityDelete(id) {
    try {
      await deleteCapacity(id);
      handleCapacitiesGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapabilityDelete(id) {
    try {
      await deleteCapability(id);
      handleCapabilitiesGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleBreakDelete(id) {
    try {
      await deleteBreak(id);
      handleBreaksGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapacityUpdate(id, editedRow) {
    try {
      await updateCapacity(id, editedRow);
      handleCapacitiesGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCapabilityUpdate(id, editedRow) {
    try {
      await updateCapability(id, editedRow);
      handleCapabilitiesGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleBreakUpdate(id, editedRow) {
    try {
      await updateBreak(id, editedRow);
      handleBreaksGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  useEffect(() => {
    handleCapacitiesGet();
    handleCapabilitiesGet();
    handleBreaksGet();
  }, []);

  const loaded = () => {
    return (
      <>
        <h1 className="text-2xl font-bold tracking-tight">
          {titleBreaks.toUpperCase()}
        </h1>
        <List
          inputArray={breaks}
          handleCreate={handleBreakCreate}
          handleDelete={handleBreakDelete}
          handleUpdate={handleBreakUpdate}
          headers={headersBreaks}
        />
        <br/>
        <h1 className="text-2xl font-bold tracking-tight">
          {titleCapacities.toUpperCase()}
        </h1>
        <List
          inputArray={capacities}
          handleCreate={handleCapacityCreate}
          handleDelete={handleCapacityDelete}
          handleUpdate={handleCapacityUpdate}
          headers={headersCapacities}
        />
        <br/>
        <h1 className="text-2xl font-bold tracking-tight">
          {titleCapabilities.toUpperCase()}
        </h1>
        <List
          inputArray={capabilities}
          handleCreate={handleCapabilityCreate}
          handleDelete={handleCapabilityDelete}
          handleUpdate={handleCapabilityUpdate}
          headers={headersCapabilities}
        />
      </>
    );
  };

  const loading = () => (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Spinner
        labelPosition="below"
        label={`Getting ${titleBreaks}, ${titleCapacities}, and ${titleCapabilities},  ready...`}
      />
    </div>
  );

  return isCapacitiesLoading && isCapabilitiesLoading && isBreaksLoading ? loading() : loaded();
};

export default Settings;
