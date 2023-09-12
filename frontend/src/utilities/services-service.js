import * as servicesAPI from "./services-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getServices() {
  try {
    const data = await servicesAPI.index();
    const modifiedData = data.map(item => ({
        ...item,
        requirements: item.requirements[0],
        earliest: isoToDatetimeLocal(item.service_times[0].earliest),
        latest: isoToDatetimeLocal(item.service_times[0].latest),
        type: item.service_times[0].type,
      }));
    return modifiedData;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createService(data){
    try {
        const modifiedData = {
            ...data,
            service_times: [{earliest: new Date(data.earliest).toISOString(), latest: new Date(data.latest).toISOString(), type: data.type}],
            requirements: [data.requirements],
          }
        const newService = await servicesAPI.create(modifiedData)
        return newService
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteService(id) {
    try {
      const deletedService = await servicesAPI.destroy(id);
      return deletedService;
    } catch (err) {
      throw err;
    }
  }


export async function updateService(id,data){
    try {
        const modifiedData = {
            ...data,
            service_times: [{earliest: new Date(data.earliest).toISOString(), latest: new Date(data.latest).toISOString(), type: data.type}],
            requirements: [data.requirements],
          }
        const updatedService = await servicesAPI.update(id,modifiedData)
        return updatedService
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

  

