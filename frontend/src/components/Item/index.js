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
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const initialEditedRow = Object.fromEntries(
    headers.map((header) => {
      if (header === "longitude") {
        return [header, inputItem.coordinates[0]];
      } else if (header === "latitude") {
        return [header, inputItem.coordinates[1]];
      } else {
        return [header, inputItem[header]];
      }
    })
  );
  const [editedRow, setEditedRow] = useState(initialEditedRow);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    handleEdit(true);
  };

  const handleChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
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
            <td className="px4 py-2 whitespace-no-wrap border-b">
              <input
                name={header}
                type={
                  header === "name"
                    ? "text"
                    : "number"
                }
                className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
                value={editedRow[header]}
                onChange={handleChange}
              />
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
                {editedRow[header]}
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
