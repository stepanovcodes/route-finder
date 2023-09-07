import * as vehiclesAPI from "./vehicles-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getVehicles() {
  try {
    const data = await vehiclesAPI.index();
    // console.log(data)
    const modifiedData = data.map(item => ({
        ...item,
        earliest_start: isoToDatetimeLocal(item.earliest_start),
        latest_end: isoToDatetimeLocal(item.latest_end),
        routing_profile: item.routing_profile.replace("mapbox/", ""),
        // start_location: item.start_location.name,
        // end_location: item.end_location.name,
        capabilities: item.capabilities[0],
        // capacities: item.capacities.name,
        breaks: item.breaks[0],
      }));
    // console.log(modifiedData)
    return modifiedData;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createVehicle(data){
    try {
        const modifiedData = {
            ...data,
            earliest_start: new Date(data.earliest_start).toISOString(),
            latest_end: new Date(data.latest_end).toISOString(),
            routing_profile: "mapbox/" + data.routing_profile,
            capabilities: [data.capabilities],
            breaks: [data.breaks],
          }
        const newVehicle = await vehiclesAPI.create(modifiedData)
        return newVehicle
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteVehicle(id) {
    try {
      const deletedVehicle = await vehiclesAPI.destroy(id);
      return deletedVehicle;
    } catch (err) {
      throw err;
    }
  }


export async function updateVehicle(id,data){
    try {
        const modifiedData = {
            ...data,
            earliest_start: new Date(data.earliest_start).toISOString(),
            latest_end: new Date(data.latest_end).toISOString(),
            routing_profile: "mapbox/" + data.routing_profile,
            capabilities: [data.capabilities],
            breaks: [data.breaks],
          }
        const updatedVehicle = await vehiclesAPI.update(id,modifiedData)
        return updatedVehicle
    }catch(err){
        throw err
    }
}


// Function to convert ISO 8601 to datetime-local format
function isoToDatetimeLocal(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  

