import * as capabilitiesAPI from "./capabilities-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getCapabilities() {
  try {
    const data = await capabilitiesAPI.index();
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createCapability(data){
    try {
        const newCapability = await capabilitiesAPI.create(data)
        return newCapability
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteCapability(id) {
    try {
      const deletedCapability = await capabilitiesAPI.destroy(id);
      return deletedCapability;
    } catch (err) {
      throw err;
    }
  }


export async function updateCapability(id,data){
    try {
        const updatedCapability = await capabilitiesAPI.update(id,data)
        return updatedCapability
    }catch(err){
        throw err
    }
}

  

