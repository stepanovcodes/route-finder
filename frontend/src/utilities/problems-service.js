import * as problemsAPI from "./problems-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getProblems() {
  try {
    const data = await problemsAPI.index();
    // console.log(data)
    const modifiedData = data.map((item) => ({
      ...item,
      objectives: item.options.objectives[0],
    }));
    // console.log(modifiedData)
    return modifiedData;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function createProblem(data) {
  try {
    console.log("data:", data);
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
    };
    console.log("modifiedData:", modifiedData);
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
      };
    const updatedProblem = await problemsAPI.update(id, modifiedData);
    return updatedProblem;
  } catch (err) {
    throw err;
  }
}
