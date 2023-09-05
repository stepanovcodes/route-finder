import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getCapacities,
  createCapacity,
  deleteCapacity,
  updateCapacity,
} from "../../utilities/capacities-service";
import List from "../../components/List";

const Capacities = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [capacities, setCapacities] = useState([]);
  const title=`capacities`;
  const headers=["name","volume","weight","boxes"];

  async function handleGet() {
    try {
      const capacititesData = await getCapacities();
      if (capacititesData.length) {
        setCapacities(capacititesData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        throw Error(capacititesData);
      }
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleCreate(newRow) {
    try {
      await createCapacity(newRow);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCapacity(id);
      handleGet();
    } catch (err) {
      console.log({ err: err.message });
    }
  }

  async function handleUpdate(id, editedRow) {
    try {
      await updateCapacity(id, editedRow);
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
          inputArray={capacities}
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

export default Capacities;
