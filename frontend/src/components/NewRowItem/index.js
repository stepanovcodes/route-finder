import { useState /*useContext*/ } from "react";
import { Button } from "@fluentui/react-components";
// import {DataContext} from "../../data/DataContext"
import Select from "react-select";
import "./NewRowItem.css";

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  return currentDateTime;
}

function NewRowItem({ handleCreate, headers, dropdownLists }) {
  // console.log(dropdownLists)

  const initialAddRow = Object.fromEntries(
    headers.map((header) => {
      let defaultSelection = [];
      switch (header) {
        case "routing_profile":
          defaultSelection = [header, "driving"];
          break;
        case "start_location":
          defaultSelection = [header, dropdownLists.locations[0]._id];
          break;
        case "end_location":
          defaultSelection = [header, dropdownLists.locations[0]._id];
          break;
        case "location":
          defaultSelection = [header, dropdownLists.locations[0]._id];
          break;
        case "from":
          defaultSelection = [header, dropdownLists.locations[0]._id];
          break;
        case "to":
          defaultSelection = [header, dropdownLists.locations[0]._id];
          break;
        case "capacities":
          defaultSelection = [header, dropdownLists.capacities[0]._id];
          break;
        case "capabilities":
          defaultSelection = [header, dropdownLists.capabilities[0]._id];
          break;
        case "requirements":
          defaultSelection = [header, dropdownLists.capabilities[0]._id];
          break;
        case "breaks":
          defaultSelection = [header, dropdownLists.breaks[0]._id];
          break;
        case "loading_policy":
          defaultSelection = [header, "any"];
          break;
        case "type":
          defaultSelection = [header, "strict"];
          break;
        case "type_pickup":
          defaultSelection = [header, "strict"];
          break;
        case "type_dropoff":
          defaultSelection = [header, "strict"];
          break;
        case "version":
          defaultSelection = [header, 1];
          break;
        case "objectives":
          defaultSelection = [header, "min-schedule-completion-time"];
          break;
        case "earliest_start":
          defaultSelection = [header, getCurrentDateTime()];
          break;
        case "earliest":
          defaultSelection = [header, getCurrentDateTime()];
          break;
        case "earliest_pickup":
          defaultSelection = [header, getCurrentDateTime()];
          break;
        case "earliest_dropoff":
          defaultSelection = [header, getCurrentDateTime()];
          break;
        case "duration":
          defaultSelection = [header, 300];
          break;
        case "dropoff_duration":
          defaultSelection = [header, 300];
          break;
        case "pickup_duration":
          defaultSelection = [header, 300];
          break;
        case "weight":
          defaultSelection = [header, 0];
          break;
        case "volume":
          defaultSelection = [header, 0];
          break;
        case "boxes":
          defaultSelection = [header, 0];
          break;
        case "latest_end":
          defaultSelection = [header, "2100-01-01T00:00"];
          break;
        case "latest":
          defaultSelection = [header, "2100-01-01T00:00"];
          break;
        case "latest_pickup":
          defaultSelection = [header, "2100-01-01T00:00"];
          break;
        case "latest_dropoff":
          defaultSelection = [header, "2100-01-01T00:00"];
          break;
        default:
          defaultSelection = [header, ""];
      }
      return defaultSelection;
    })
  );
  // if (headers.includes("vehicles")) initialAddRow.locations = null;
// console.log(initialAddRow)
  const [newRow, setNewRow] = useState(initialAddRow);
  // const locations = useContext(DataContext);

  function handleMultiSelectChange(e, metadata) {
    setNewRow({ ...newRow, [metadata.name]: e });

    // console.log(e);
    // console.log(newRow);
  }
  function handleChange(e) {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
    // console.log(e);
    // console.log(newRow);

    // Custom validation logic
    // if (e.target.name === "latitude") {
    //   if (isNaN(e.target.value) || parseFloat(e.target.value) < -90 || parseFloat(e.target.value) > 90) {
    //     // Invalid latitude
    //     e.target.setCustomValidity("Latitude must be between -90 and 90.");
    //   } else {
    //     // Valid latitude
    //     e.target.setCustomValidity("");
    //   }
    // } else if (e.target.name === "longitude") {
    //   if (isNaN(e.target.value) || parseFloat(e.target.value) < -180 || parseFloat(e.target.value) > 180) {
    //     // Invalid latitude
    //     e.target.setCustomValidity("Longitude must be between -180 and 180.");
    //   } else {
    //     // Valid latitude
    //     e.target.setCustomValidity("");
    //   }
    // } else if (!e.target.value) {
    //   e.target.setCustomValidity(`${e.target.name} required.`)
    // }
  }

  async function handleAddRow(e) {
    // const nameInput = document.getElementById("input-name-new");
    // const latitudeInput = document.getElementById("input-latitude-new");
    // const longitudeInput = document.getElementById("input-longitude-new");

    // Check the validity of each field
    // const isNameValid = nameInput.checkValidity();
    // const isLatitudeValid = latitudeInput.checkValidity();
    // const isLongitudeValid = longitudeInput.checkValidity();
    // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    // if (isNameValid && isLatitudeValid && isLongitudeValid) {
    //   handleValidation(true)
    // Initialize an object to store key mappings for location fields


    handleCreate(newRow);
    setNewRow(initialAddRow);
    // } else {
    //   // setIsValid(false)
    //   handleValidation(false)
    //   // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    // }
  }

  return (
    <>
      <tr className="group p-4 mb-4">
        {headers.map((header) => (
          <td key={header} className=" px4 py-2 whitespace-no-wrap">
            {header === "routing_profile" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  <option value="driving">driving</option>
                  <option value="driving-traffic">driving-traffic</option>
                  <option value="cycling">cycling</option>
                  <option value="walking">walking</option>
                </select>
              </>
            ) : header === "start_location" ||
              header === "end_location" ||
              header === "from" ||
              header === "to" ||
              header === "location" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  {dropdownLists.locations.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </>
            ) : header === "capacities" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  {dropdownLists.capacities.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </>
            ) : header === "capabilities" || header === "requirements" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  {dropdownLists.capabilities.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </>
            ) : header === "breaks" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  {dropdownLists.breaks.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </>
            ) : header === "loading_policy" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  <option value="any">any</option>
                  <option value="fifo">fifo</option>
                  <option value="lifo">lifo</option>
                </select>
              </>
            ) : header === "type" ||
              header === "type_pickup" ||
              header === "type_dropoff" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  <option value="strict">strict</option>
                  <option value="soft">soft</option>
                  <option value="soft_start">soft_start</option>
                  <option value="soft_end">soft_end</option>
                </select>
              </>
            ) : header === "objectives" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={newRow[header]}
                  onChange={handleChange}
                >
                  <option value="min-schedule-completion-time">
                    Min Longest Schedule
                  </option>
                  <option value="min-total-travel-duration">
                    Min Travel Time
                  </option>
                </select>
              </>
            ) : header === "vehicles" ||
              header === "services" ||
              header === "shipments" ? (
              <div className="w-full border-2 rounded focus:outline-none focus:border-blue-500 control-height">
                <Select
                  // defaultValue={dropdownLists[header].map(({_id, name}) =>{return {value: _id, label: name}})[0]}
                  isMulti
                  name={header}
                  value={newRow[header]}
                  options={dropdownLists[header].map(({ _id, name }) => {
                    return { value: _id, label: name };
                  })}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  setValue
                  onChange={handleMultiSelectChange}
                />
              </div>
            ) : (
              <input
                name={header}
                type={
                  header === "name"
                    ? "text"
                    : header === "earliest_start" ||
                      header === "latest_end" ||
                      header === "earliest" ||
                      header === "latest" ||
                      header === "earliest_pickup" ||
                      header === "latest_pickup" ||
                      header === "earliest_dropoff" ||
                      header === "latest_dropoff"
                    ? "datetime-local"
                    : "number"
                }
                className={`w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 ${
                  header === "earliest_start" ||
                  header === "latest_end" ||
                  header === "earliest" ||
                  header === "latest" ||
                  header === "earliest_pickup" ||
                  header === "latest_pickup" ||
                  header === "earliest_dropoff" ||
                  header === "latest_dropoff"
                    ? "text-xs control-height"
                    : ""
                }`}
                value={newRow[header]}
                disabled={header === "version" ? true : false}
                placeholder={header.charAt(0).toUpperCase() + header.slice(1)}
                onChange={handleChange}
              />
            )}
          </td>
        ))}
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
            Add Row
          </Button>
        </td>
      </tr>
    </>
  );
}

export default NewRowItem;
