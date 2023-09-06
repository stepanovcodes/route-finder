import * as breaksAPI from "./breaks-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getBreaks() {
  try {
    const data = await breaksAPI.index();
    // console.log(data)
    const modifiedData = data.map(item => ({
        ...item,
        earliest_start: isoToDatetimeLocal(item.earliest_start),
        latest_end: isoToDatetimeLocal(item.latest_end),
      }));
    return modifiedData;
  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
}

export async function createBreak(data){
    try {
        // console.log(data)
        const modifiedData = {
            ...data,
            earliest_start: new Date(data.earliest_start).toISOString(),
            latest_end: new Date(data.latest_end).toISOString()
          }
        const newBreak = await breaksAPI.create(modifiedData)
        return newBreak
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export async function deleteBreak(id) {
    try {
      const deletedBreak = await breaksAPI.destroy(id);
      return deletedBreak;
    } catch (err) {
      throw err;
    }
  }


export async function updateBreak(id,data){
    try {
        const modifiedData = {
            ...data,
            earliest_start: new Date(data.earliest_start).toISOString(),
            latest_end: new Date(data.latest_end).toISOString()
          }
        const updatedBreak = await breaksAPI.update(id,modifiedData)
        return updatedBreak
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

  

