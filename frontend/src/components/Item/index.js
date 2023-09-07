import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DeleteConfirmation from "../DeleteConfirmation";

function Item({
  inputItem,
  headers,
  handleEdit,
  hideIcons,
  handleDelete,
  handleUpdate,
  dropdownLists,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const initialEditedRow = Object.fromEntries(
    headers.map((header) => {
      // console.log(header, inputItem[header])
      if (header === "longitude") {
        return [header, inputItem.coordinates[0]];
      } else if (header === "latitude") {
        return [header, inputItem.coordinates[1]];
      } else if (
        header === "breaks" ||
        header === "capabilities" ||
        header === "capacities" ||
        header === "start_location" ||
        header === "end_location" ||
        header === "location" ||
        header === "locations" ||
        header === "vehicles" ||
        header === "services" ||
        header === "shipments" ||
        header === "from" ||
        header === "to" ||
        header === "requirements"
      ) {
        return [header, inputItem[header]._id];
      } else {
        return [header, inputItem[header]];
      }
    })
  );

  // const initialDisplayedRow = Object.fromEntries(
  //   headers.map((header) => {
  //     // console.log(header, inputItem[header])
  //     if (header === "longitude") {
  //       return [header, inputItem.coordinates[0]];
  //     } else if (header === "latitude") {
  //       return [header, inputItem.coordinates[1]];
  //     } else if (header === "breaks" || header === "capabilities"|| header === "capacities" || header === "start_location" || header === "end_location") {
  //       return [header, inputItem[header].name];
  //     } else {
  //       return [header, inputItem[header]];
  //     }
  //   })
  // );
  // console.log("initialEditedRow", initialEditedRow)
  const [editedRow, setEditedRow] = useState(initialEditedRow);
  // const [displayedRow] = useState(initialDisplayedRow);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  // console.log(dropdownLists)

  const handleEditClick = () => {
    setIsEditing(true);
    handleEdit(true);
  };

  const handleChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
    // console.log( editedRow)
    // if (e.target.name === "latitude") {
    //   if (
    //     isNaN(e.target.value) ||
    //     parseFloat(e.target.value) < -90 ||
    //     parseFloat(e.target.value) > 90
    //   ) {
    //     // Invalid latitude
    //     e.target.setCustomValidity("Latitude must be between -90 and 90.");
    //   } else {
    //     // Valid latitude
    //     e.target.setCustomValidity("");
    //   }
    // } else if (e.target.name === "longitude") {
    //   if (
    //     isNaN(e.target.value) ||
    //     parseFloat(e.target.value) < -180 ||
    //     parseFloat(e.target.value) > 180
    //   ) {
    //     // Invalid latitude
    //     e.target.setCustomValidity("Longitude must be between -180 and 180.");
    //   } else {
    //     // Valid latitude
    //     e.target.setCustomValidity("");
    //   }
    // } else if (!e.target.value) {
    //   e.target.setCustomValidity(`${e.target.name} required.`);
    // }
  };

  const handleUpdateClick = () => {
    // console.log( editedRow)
    // const nameInput = document.getElementById("input-name");
    // const latitudeInput = document.getElementById("input-latitude");
    // const longitudeInput = document.getElementById("input-longitude");

    // // Check the validity of each field
    // const isNameValid = nameInput.checkValidity();
    // const isLatitudeValid = latitudeInput.checkValidity();
    // const isLongitudeValid = longitudeInput.checkValidity();
    // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    // if (isNameValid && isLatitudeValid && isLongitudeValid) {
    handleUpdate(inputItem._id, editedRow);
    setIsEditing(false);
    handleEdit(false);
    // console.log( editedRow)
    // } else {
    // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    // }
  };

  const handleCancelClick = () => {
    setEditedRow(initialEditedRow);
    setIsEditing(false);
    handleEdit(false);
  };

  const handleTrashIconClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const closeDialog = () => {
    setIsDeleteConfirmationOpen(false);
    setIsHovered(false);
  };

  const handleDeleteClick = () => {
    handleDelete(inputItem._id);
    closeDialog();
  };

  return (
    <>
      {isEditing ? (
        <tr
          key={inputItem._id}
          className="group p-4 mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        {headers.map((header) => (
          <td key={header} className=" px4 py-2 whitespace-no-wrap">
            {header === "routing_profile" ? (
              <>
                <select
                  name={header}
                  className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                  value={editedRow[header]}
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
                  value={editedRow[header]}
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
                  value={editedRow[header]}
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
                  value={editedRow[header]}
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
                  value={editedRow[header]}
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
                  value={editedRow[header]}
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
                  value={editedRow[header]}
                  onChange={handleChange}
                >
                  <option value="strict">strict</option>
                  <option value="soft">soft</option>
                  <option value="soft_start">soft_start</option>
                  <option value="soft_end">soft_end</option>
                </select>
              </>
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
                value={editedRow[header]}
                placeholder={header.charAt(0).toUpperCase() + header.slice(1)}
                onChange={handleChange}
              />
            )}
          </td>
        ))}
          <td>
            <div
              className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white cursor-pointer hover:bg-gray-50"
              onClick={handleUpdateClick}
            >
              <CheckIcon
                className="h-6 w-6 text-gray-600 hover:text-indigo-600"
                aria-hidden="true"
              />
            </div>
          </td>
          <td>
            <div
              className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white cursor-pointer hover:bg-gray-50"
              onClick={handleCancelClick}
            >
              <XMarkIcon
                className="h-6 w-6 text-gray-600 hover:text-indigo-600"
                aria-hidden="true"
              />
            </div>
          </td>
        </tr>
      ) : (
        <tr
          key={inputItem._id}
          className="group p-4 mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {headers.map((header) => (
            <td key={header} className=" px4 py-2 whitespace-no-wrap border-b">
              <div className="w-full px-2 py-2 border-2 border-white rounded">
                {header === "breaks" ||
                header === "capabilities" ||
                header === "capacities"
                  ? dropdownLists[header].find(
                      (item) => item._id === editedRow[header]
                    ).name
                  : header === "start_location" ||
                    header === "end_location" ||
                    header === "location" ||
                    header === "from" ||
                    header === "to"
                  ? dropdownLists.locations.find(
                      (item) => item._id === editedRow[header]
                    ).name
                  : header === "requirements"
                  ? dropdownLists.capabilities.find(
                      (item) => item._id === editedRow[header]
                    ).name
                  : editedRow[header]}
              </div>
            </td>
          ))}
          <td>
            <div
              className={`group flex h-7 w-7 items-center justify-center rounded-lg bg-white ${
                !hideIcons ? " cursor-pointer hover:bg-gray-50" : ""
              }`}
              onClick={!hideIcons ? handleEditClick : null}
            >
              {isHovered && !hideIcons && (
                <PencilSquareIcon
                  className="h-6 w-6 text-gray-600 hover:text-indigo-600"
                  aria-hidden="true"
                />
              )}
            </div>
          </td>
          <td>
            <div
              className={`group flex h-7 w-7 items-center justify-center rounded-lg bg-white ${
                !hideIcons ? " cursor-pointer hover:bg-gray-50" : ""
              }`}
              onClick={!hideIcons ? handleTrashIconClick : null}
            >
              {isHovered && !hideIcons && (
                <TrashIcon
                  className="h-6 w-6 text-gray-600 hover:text-indigo-600"
                  aria-hidden="true"
                />
              )}
            </div>

            <DeleteConfirmation
              name={editedRow.name}
              isDeleteConfirmationOpen={isDeleteConfirmationOpen}
              closeDialog={closeDialog}
              handleDeleteClick={handleDeleteClick}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default Item;
