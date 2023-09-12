import * as shipmentsAPI from "./shipments-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getShipments() {
  try {
    const data = await shipmentsAPI.index();
    const modifiedData = data.map(item => ({
        ...item,
        weight: item.size.weight,
        volume: item.size.volume,
        boxes: item.size.boxes,
        requirements: item.requirements[0],
        earliest_pickup: isoToDatetimeLocal(item.pickup_times[0].earliest),
        latest_pickup: isoToDatetimeLocal(item.pickup_times[0].latest),
        type_pickup: item.pickup_times[0].type,
        earliest_dropoff: isoToDatetimeLocal(item.dropoff_times[0].earliest),
        latest_dropoff: isoToDatetimeLocal(item.dropoff_times[0].latest),
        type_dropoff: item.dropoff_times[0].type,
      }));
    return modifiedData;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createShipment(data){
    try {
        console.log("data:", data)
        const modifiedData = {
            ...data,
            size: {weight: data.weight, volume: data.volume, boxes: data.boxes},
            pickup_times: [{earliest: new Date(data.earliest_pickup).toISOString(), latest: new Date(data.latest_pickup).toISOString(), type: data.type_pickup}],
            dropoff_times: [{earliest: new Date(data.earliest_dropoff).toISOString(), latest: new Date(data.latest_dropoff).toISOString(), type: data.type_dropoff}],
            requirements: [data.requirements],
          }
          console.log("modifiedData:", modifiedData)
        const newShipment = await shipmentsAPI.create(modifiedData)
        return newShipment
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteShipment(id) {
    try {
      const deletedShipment = await shipmentsAPI.destroy(id);
      return deletedShipment;
    } catch (err) {
      throw err;
    }
  }


export async function updateShipment(id,data){
    try {
        const modifiedData = {
            ...data,
            size: {weight: data.weight, volume: data.volume, boxes: data.boxes},
            pickup_times: [{earliest: new Date(data.earliest_pickup).toISOString(), latest: new Date(data.latest_pickup).toISOString(), type: data.type_pickup}],
            dropoff_times: [{earliest: new Date(data.earliest_dropoff).toISOString(), latest: new Date(data.latest_dropoff).toISOString(), type: data.type_dropoff}],
            requirements: [data.requirements],
          }
        const updatedShipment = await shipmentsAPI.update(id,modifiedData)
        return updatedShipment
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

  

