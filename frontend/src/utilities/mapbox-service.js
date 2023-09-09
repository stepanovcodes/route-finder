

export async function submitProblem(data) {

const accessToken = process.env.REACT_APP_ACCESS_TOKEN
const url = `https://api.mapbox.com/optimized-trips/v2?access_token=${accessToken}`;
  
  const headers = {
    "Content-Type": "application/json",
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(url, requestOptions);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid POST Request");
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}


export async function getSubmissions(data) {
    const url = `https://api.mapbox.com/optimized-trips/v2?access_token=pk.eyJ1Ijoic3RlcGFub3Zjb2RlcyIsImEiOiJjbGxzdjVuc2kwMTBuM2VxdGpzcHRtMnl4In0.r0XemjswrRcT_waet1Ra-A`;
    // console.log(process.env.MAPBOX_OPTIMIZATION_V2_ACCESS_TOKEN)
    const headers = {
      "Content-Type": "application/json",
    };
  
    const requestOptions = {
      method: "GET",
      headers: headers,
    };
  
    try {
      const res = await fetch(url, requestOptions);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Invalid POST Request");
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
