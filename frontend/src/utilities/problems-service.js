import * as problemsAPI from "./problems-api";
import { getVehicles } from "./vehicles-service";
import { getServices } from "./services-service";
import { getShipments } from "./shipments-service";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getProblems() {
  try {
    const data = await problemsAPI.index();
    // console.log('data:', data)
    const modifiedData = data.map((item) => ({
      ...item,
      objectives: item.options.objectives[0],
      services: item.services.map(({ _id, name }) => {
        return { value: _id,  label: name};
      }),
      shipments: item.shipments.map(({ _id, name }) => {
        return { value: _id,  label: name};
      }),
      vehicles: item.vehicles.map(({ _id, name }) => {
        return { value: _id,  label: name};
      }),
    }));
    // console.log('modifiedData:', modifiedData)
    return modifiedData;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function createProblem(data) {
  try {
    let vehicles = await getVehicles();
    let services = await getServices();
    let shipments = await getShipments();
    if (shipments.length && services.length && shipments.length) {
      vehicles = vehicles.map(
        ({ _id, name, start_location, end_location }) => ({
          _id,
          name,
          start_location,
          end_location,
        })
      );
      services = services.map(({ _id, name, location }) => ({
        _id,
        name,
        location,
      }));
      shipments = shipments.map(({ _id, name, from, to }) => ({
        _id,
        name,
        from,
        to,
      }));
    } else {
      throw Error(shipments, vehicles, services);
    }
    const input = {services,shipments, vehicles};

    // console.log("data:", data);
    const modifiedData = {
      ...data,
      options: { objectives: [data.objectives] },
      services: data.services.map(({ value }) => {
        return { _id: value };
      }),
      shipments: data.shipments.map(({ value }) => {
        return { _id: value };
      }),
      vehicles: data.vehicles.map(({ value }) => {
        return { _id: value };
      }),
      locations: locationsBuilder(data, input),
      version: 1
    };

    // console.log("modifiedData:", modifiedData);
    const newProblem = await problemsAPI.create(modifiedData);
    return newProblem;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteProblem(id) {
  try {
    const deletedProblem = await problemsAPI.destroy(id);
    return deletedProblem;
  } catch (err) {
    throw err;
  }
}

export async function updateProblem(id, data) {
  try {
    let vehicles = await getVehicles();
    let services = await getServices();
    let shipments = await getShipments();
    if (shipments.length && services.length && shipments.length) {
      vehicles = vehicles.map(
        ({ _id, name, start_location, end_location }) => ({
          _id,
          name,
          start_location,
          end_location,
        })
      );
      services = services.map(({ _id, name, location }) => ({
        _id,
        name,
        location,
      }));
      shipments = shipments.map(({ _id, name, from, to }) => ({
        _id,
        name,
        from,
        to,
      }));
    } else {
      throw Error(shipments, vehicles, services);
    }
    const input = {services,shipments, vehicles};

    // console.log("data:", data);
    const modifiedData = {
      ...data,
      options: { objectives: [data.objectives] },
      services: data.services.map(({ value }) => {
        return { _id: value };
      }),
      shipments: data.shipments.map(({ value }) => {
        return { _id: value };
      }),
      vehicles: data.vehicles.map(({ value }) => {
        return { _id: value };
      }),
      locations: locationsBuilder(data, input)
    };
    // console.log("modifiedData:", modifiedData);
    const updatedProblem = await problemsAPI.update(id, modifiedData);
    return updatedProblem;
  } catch (err) {
    throw err;
  }
}

function locationsBuilder(data, input) {
  const locationIds = [];
  for (const keyData in data) {
    if (
      keyData === "services" ||
      keyData === "shipments" ||
      keyData === "vehicles"
    ) {
      data[keyData].forEach((itemData) => {
        for (const keyInput in input) {
          if (keyInput === keyData) {
            input[keyInput].forEach((itemInput) => {
              if (
                keyInput === "services" &&
                itemInput._id === itemData.value
              ) {
                if (!locationIds.includes(itemInput.location._id))
                  locationIds.push(itemInput.location._id);
              } else if (
                keyInput === "shipments" &&
                itemInput._id === itemData.value
              ) {
                if (!locationIds.includes(itemInput.from._id))
                  locationIds.push(itemInput.from._id);
                if (!locationIds.includes(itemInput.to._id))
                  locationIds.push(itemInput.to._id);
              } else if (
                keyInput === "vehicles" &&
                itemInput._id === itemData.value
              ) {
                if (!locationIds.includes(itemInput.start_location._id))
                  locationIds.push(itemInput.start_location._id);
                if (!locationIds.includes(itemInput.end_location._id))
                  locationIds.push(itemInput.end_location._id);
              }
            });
          }
        }
      });
    }
  }
  const modifiedLocationIds = locationIds.map((item) => ({ _id: item }));
  return modifiedLocationIds
}
