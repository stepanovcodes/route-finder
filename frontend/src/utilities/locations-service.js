import * as locationsAPI from "./locations-api";
// because the api will export an exports object all modules can be imported with an * (wildcard)
// the as import keywork will provide a variable reference to the different sub-modules we will export from people-api.js

export async function getLocations() {
  try {
    const data = await locationsAPI.index();
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

