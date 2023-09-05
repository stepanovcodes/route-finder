import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DeleteConfirmation from "../../components/DeleteConfirmation";

function LocationItem({
  id,
  name,
  latitude,
  longitude,
  onEdit,
  hideIcons,
  handleDelete,
  handleUpdate,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState({
    name: name,
    latitude: latitude,
    longitude: longitude,
  });
  //   const [editedName, setEditedName] = useState(name);
  //   const [editedLatitude, setEditedLatitude] = useState(latitude);
  //   const [editedLongitude, setEditedLongitude] = useState(longitude);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    onEdit(true);
  };

  const handleChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
    // console.log(e.target.name);
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
  };

  const handleSaveClick = () => {
    const nameInput = document.getElementById("input-name");
    const latitudeInput = document.getElementById("input-latitude");
    const longitudeInput = document.getElementById("input-longitude");

    // Check the validity of each field
    const isNameValid = nameInput.checkValidity();
    const isLatitudeValid = latitudeInput.checkValidity();
    const isLongitudeValid = longitudeInput.checkValidity();
    // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    if (isNameValid && isLatitudeValid && isLongitudeValid) {
      handleUpdate(id, {
        name: editedRow.name,
        coordinates: [editedRow.longitude, editedRow.latitude],
      });
      setIsEditing(false);
      onEdit(false);
      setIsHovered(false);
    } else {
      // console.log(`isNameValid = ${isNameValid}, isLatitudeValid = ${isLatitudeValid}, isLongitudeValid = ${isLongitudeValid}`)
    }
  };

  const handleCancelClick = () => {
    setEditedRow({
      name: name,
      latitude: latitude,
      longitude: longitude,
    });
    setIsEditing(false);
    onEdit(false);
    setIsHovered(false);
  };

  const handleTrashIconClick = () => {
    // Open the DeleteConfirmation dialog
    // console.log("Delete icon clicked");
    // console.log("TrashIconClick")
    setIsDeleteConfirmationOpen(true);
  };

  const closeDialog = () => {
    // console.log("closeDialoge")
    setIsDeleteConfirmationOpen(false);
    setIsHovered(false);
  };

  const handleConfirmClick = () => {
    handleDelete(id);
    closeDialog();
    setIsHovered(false);
  };

  return (
    <>
      {isEditing ? (
        <tr
          key={id}
          className="group p-4 mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <td className="px4 py-2 whitespace-no-wrap border-b">
            <input
              id="input-name"
              name="name"
              type="text"
              className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              value={editedRow.name}
              onChange={handleChange}
            />
          </td>
          <td className="px4 py-2 whitespace-no-wrap border-b">
            <input
              id="input-latitude"
              name="latitude"
              type="number"
              className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              value={editedRow.latitude}
              onChange={handleChange}
            />
          </td>
          <td className=" px4 py-2 whitespace-no-wrap border-b">
            <input
              id="input-longitude"
              name="longitude"
              type="number"
              className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              value={editedRow.longitude}
              onChange={handleChange}
            />
          </td>
          <td>
            <div
              className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white cursor-pointer hover:bg-gray-50"
              onClick={handleSaveClick}
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
          key={id}
          className="group p-4 mb-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <td className=" px4 py-2 whitespace-no-wrap border-b">
            <div className="w-full px-2 py-2 border-2 border-white rounded">
              {editedRow.name}
            </div>
          </td>
          <td className=" px4 py-2 whitespace-no-wrap border-b">
            <div className="w-full px-2 py-2 border-2 border-white rounded">
              {editedRow.latitude}
            </div>
          </td>
          <td className=" px4 py-2 whitespace-no-wrap border-b">
            <div className="w-full px-2 py-2 border-2 border-white rounded">
              {editedRow.longitude}
            </div>
          </td>
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
              handleConfirmClick={handleConfirmClick}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default LocationItem;
