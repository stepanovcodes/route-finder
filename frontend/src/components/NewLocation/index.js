import { useState } from "react";
import { Button } from "@fluentui/react-components";

function NewLocation(/*{ handleNewRowChange }*/ { handleCreate, handleValidation}) {
  const [newRow, setNewRow] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });
  

  function handleChange(e) {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });

    // Custom validation logic
  if (e.target.name === "latitude") {
    if (isNaN(e.target.value) || parseFloat(e.target.value) < -90 || parseFloat(e.target.value) > 90) {
      // Invalid latitude
      e.target.setCustomValidity("Latitude must be between -90 and 90.");
    } else {
      // Valid latitude
      e.target.setCustomValidity("");
    }
  } else if (e.target.name === "longitude") {
    if (isNaN(e.target.value) || parseFloat(e.target.value) < -180 || parseFloat(e.target.value) > 180) {
      // Invalid latitude
      e.target.setCustomValidity("Longitude must be between -180 and 180.");
    } else {
      // Valid latitude
      e.target.setCustomValidity("");
    }
  } else if (!e.target.value) {
    e.target.setCustomValidity(`${e.target.name} required.`)
  }
  }

  async function handleAddRow(e) {
    const nameInput = document.getElementById("input-name-new");
    const latitudeInput = document.getElementById("input-latitude-new");
    const longitudeInput = document.getElementById("input-longitude-new");

    // Check the validity of each field
    const isNameValid = nameInput.checkValidity();
    const isLatitudeValid = latitudeInput.checkValidity();
    const isLongitudeValid = longitudeInput.checkValidity();
    // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    if (isNameValid && isLatitudeValid && isLongitudeValid) {
      handleValidation(true)
    handleCreate({
      name: newRow.name,
      coordinates: [newRow.longitude, newRow.latitude],
    });
    setNewRow({
      name: "",
      latitude: "",
      longitude: "",
    });
  } else {
    // setIsValid(false)
    handleValidation(false)
    // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
  }
}

  return (
    <>
      <tr className="group p-4 mb-4">
        <td className=" px4 py-2 whitespace-no-wrap">
          <input
            id="input-name-new"
            name="name"
            type="text"
            required
            className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
            value={newRow.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </td>
        <td className=" px4 py-2 whitespace-no-wrap">
          <input
            id="input-latitude-new"
            name="latitude"
            type="number"
            required
            className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
            value={newRow.latitude}
            placeholder="Latitude"
            onChange={handleChange}
          />
        </td>
        <td className="px4 py-2 whitespace-no-wrap">
          <input
            id="input-longitude-new"
            name="longitude"
            type="number"
            required
            className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
            value={newRow.longitude}
            placeholder="Longitude"
            onChange={handleChange}
          />
        </td>
        <td>
          <div className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white"></div>
        </td>
        <td>
          <div className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white"></div>
        </td>
      </tr>
      <tr className="group p-4 mb-4">
        <td>
          <Button appearance="primary" onClick={handleAddRow}>
            + Add Row
          </Button>
        </td>
      </tr>
    </>
  );
}

export default NewLocation;
