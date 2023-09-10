import { useState, useEffect } from "react";
import { Spinner } from "@fluentui/react-components";
import {
  getProblems,
  createProblem,
  deleteProblem,
  updateProblem,
  getProblem,
  pushSubmission,
} from "../../utilities/problems-service";
// import {
//     getLocations,
//   } from "../../utilities/locations-service";
import { getVehicles } from "../../utilities/vehicles-service";
import { getServices } from "../../utilities/services-service";
import { getShipments } from "../../utilities/shipments-service";
import { submitProblem, getSubmissions } from "../../utilities/mapbox-service";
import ProblemList from "../../components/ProblemList";

const Problems = (props) => {
  const [isProblemsLoading, setIsProblemsLoading] = useState(true);
  //   const [isLocationsLoading, setIsLocationsLoading] = useState(true);
  const [isVehiclesLoading, setIsVehiclesLoading] = useState(true);
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [isShipmentsLoading, setIsShipmentsLoading] = useState(true);
  const [isSubmissionsLoading, setIsSubmissionsLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  //   const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [submissions, setSubmissions] = useState(null);
  const title = `problems`;
  const headers = ["name", "vehicles", "services", "shipments", "objectives"];

  function removeIdKeys(obj) {
    if (obj instanceof Array) {
      // If obj is an array, iterate through its elements
      for (let i = 0; i < obj.length; i++) {
        obj[i] = removeIdKeys(obj[i]); // Recursively call the function
      }
    } else if (obj !== null && typeof obj === "object") {
      // If obj is an object, iterate through its properties
      for (const key in obj) {
        if (key === "_id") {
          delete obj[key]; // Remove the _id key
        } else {
          obj[key] = removeIdKeys(obj[key]); // Recursively call the function
        }
      }
    }
    return obj;
  }

  function replaceNestedObjectNames(data) {
    if (data instanceof Array) {
      // If data is an array, iterate through its elements
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i])
        data[i] = replaceNestedObjectNames(data[i]); // Recursively call the function
      }
    } else if (data !== null && typeof data === "object") {
      // If data is an object, iterate through its properties
      for (const key in data) {
        // console.log (`KEY ${key}, DATA ${data[key]}, TYPE ${typeof data[key]}`)
        if (
          (key === "start_location" ||
            key === "end_location" ||
            key === "capabilities" ||
            key === "location" ||
            key === "requirements" ||
            key === "to" ||
            key === "from") &&
          data[key] !== null &&
          typeof data[key] === "object"
        ) {
          if ("name" in data[key]) {
            // console.log("object", data[key]);
            data[key] = data[key]["name"]; // Replace "name" value in the specified keys
          } else if (Array.isArray(data[key])) {
            // console.log("array before", data[key]);
            data[key] = data[key].map((item) => {
              return item.name;
            });
            // console.log("array after", data[key]);
          }
        } else {
          data[key] = replaceNestedObjectNames(data[key]); // Recursively call the function
        }
      }
    }
    return data;
  }

  async function handleGet() {
    try {
      const problemsData = await getProblems();
      //  console.log(problemsData);
      // if (problemsData.length) {
      setProblems(problemsData);
      setIsProblemsLoading(false);
      // } else {
      //   setIsProblemsLoading(false);
      //   throw Error(problemsData);
      // }

      const vehiclesData = await getVehicles();
      // if (vehiclesData.length) {
      setVehicles(
        vehiclesData.map(({ _id, name, start_location, end_location }) => ({
          _id,
          name,
          start_location,
          end_location,
        }))
      );
      setIsVehiclesLoading(false);
      // } else {
      //   setIsVehiclesLoading(false);
      //   throw Error(vehiclesData);
      // }
      const servicesData = await getServices();
      // if (servicesData.length) {
      setServices(
        servicesData.map(({ _id, name, location }) => ({
          _id,
          name,
          location,
        }))
      );
      setIsServicesLoading(false);
      // } else {
      //   setIsServicesLoading(false);
      //   throw Error(servicesData);
      // }
      const shipmentsData = await getShipments();
      // if (shipmentsData.length) {
      setShipments(
        shipmentsData.map(({ _id, name, from, to }) => ({
          _id,
          name,
          from,
          to,
        }))
      );
      setIsShipmentsLoading(false);
      // } else {
      //   setIsShipmentsLoading(false);
      //   throw Error(shipmentsData);
      // }

      const submissionsData = await getSubmissions();
      // console.log (submissionsData)
      // console.log (problemsData)
      setSubmissions(submissionsData);
      // if (submissionsData.length) {
      setSubmissions(submissionsData);
      setIsSubmissionsLoading(false);
      // console.log(submissionsData)
      // } else {
      //   setIsSubmissionsLoading(false);
      //   throw Error(submissionsData);
      // }
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

  async function handleSubmitProblem(id) {
    try {
      const problemData = await getProblem(id);
      const problemDataModified = replaceNestedObjectNames(
        removeIdKeys(problemData)
      );
      // console.log(problemData)
      console.log(JSON.stringify(problemDataModified));
      const res = await submitProblem(problemDataModified);
      await pushSubmission(id, res);
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
        <h1 className="text-2xl font-bold tracking-tight">
          {title.toUpperCase()}
        </h1>
        {/* <DataContext.Provider value={locations}> */}
        <ProblemList
          inputArray={problems}
          submissions={submissions}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleSubmitProblem={handleSubmitProblem}
          headers={headers}
          dropdownLists={{ /*locations,*/ vehicles, services, shipments }}
        />
        {/* </DataContext.Provider> */}
      </>
    );
  };

  const loading = () => (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Spinner labelPosition="below" label={`Getting ${title} ready...`} />
    </div>
  );

  return isProblemsLoading /*|| isLocationsLoading*/ ||
    isVehiclesLoading ||
    isServicesLoading ||
    isShipmentsLoading ||
    isSubmissionsLoading
    ? loading()
    : loaded();
};

export default Problems;
