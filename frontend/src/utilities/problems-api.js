const BASE_URL = `${process.env.REACT_APP_BASE_URL}/problems`;

export async function index() {
  const res = await fetch(BASE_URL, { method: "GET" });
  // console.log('res.ok: ',res.ok)
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function create(data) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    throw new Error("Invalid Request");
  }
}

export async function destroy(id) {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (res.ok) {
  } else {
    throw new Error("Invalid Request");
  }
}

export async function update(id, updatedData) {
  const url = `${BASE_URL}/${id}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (res.ok) {
  } else {
    throw new Error("Invalid PUT Request");
  }
}

export async function show(id) {
  const url = `${BASE_URL}/${id}`;
  // console.log(url)
  const res = await fetch(url, { method: "GET" })
  // console.log('res.ok: ',res)
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid PUT Request");
  }
}

