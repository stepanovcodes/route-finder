import * as locationsAPI from "./locations-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getLocations() {
  try {
    const data = await locationsAPI.index();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createLocation(data){
    try {
        const newLocation = await locationsAPI.create(data)
        return newLocation
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteLocation(id) {
    try {
      const deletedLocation = await locationsAPI.destroy(id);
      return deletedLocation;
    } catch (err) {
      throw err;
    }
  }


export async function updateLocation(id,data){
    try {
        const updatedLocation = await locationsAPI.update(id,data)
        return updatedLocation
    }catch(err){
        throw err
    }
}

  

