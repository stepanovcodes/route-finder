import * as capacitiesAPI from "./capacities-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getCapacities() {
  try {
    const data = await capacitiesAPI.index();
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createCapacity(data){
    try {
        const newCapacity = await capacitiesAPI.create(data)
        return newCapacity
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteCapacity(id) {
    try {
      const deletedCapacity = await capacitiesAPI.destroy(id);
      return deletedCapacity;
    } catch (err) {
      throw err;
    }
  }


export async function updateCapacity(id,data){
    try {
        const updatedCapacity = await capacitiesAPI.update(id,data)
        return updatedCapacity
    }catch(err){
        throw err
    }
}

  

