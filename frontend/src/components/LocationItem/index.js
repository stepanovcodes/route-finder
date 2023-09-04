import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DeleteConfirmation from "../../components/DeleteConfirmation";

function LocationItem({ id, name, latitude, longitude, onUpdate, onEdit,hideIcons }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedLatitude, setEditedLatitude] = useState(latitude);
  const [editedLongitude, setEditedLongitude] = useState(longitude);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    onEdit(true);
  };

  const handleSaveClick = () => {
    onUpdate({
      name: editedName,
      latitude: editedLatitude,
      longitude: editedLongitude,
    });
    setIsEditing(false);
    onEdit(false);
    setIsHovered(false);
  };

  const handleCancelClick = () => {
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
    // Perform your delete action here
    // Then close the dialog
    // console.log("Perform your delete action here")
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
          <td className="w-full pl-4 pr-4 py-1.5 whitespace-no-wrap border-b">
            <input
              type="text"
              className="w-full px-1 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </td>
          <td className="w-full pl-4 pr-4  py-1.5 whitespace-no-wrap border-b">
            <input
              type="number"
              className="w-full px-1 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              value={editedLatitude}
              onChange={(e) => setEditedLatitude(e.target.value)}
            />
          </td>
          <td className="w-full pl-4 pr-4  py-1.5 whitespace-no-wrap border-b">
            <input
              type="number"
              className="w-full px-1 py-2 border-2 rounded focus:outline-none focus:border-blue-500"
              value={editedLongitude}
              onChange={(e) => setEditedLongitude(e.target.value)}
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
          <td className="w-full px-6 py-4 whitespace-no-wrap border-b">
            {editedName}
          </td>
          <td className="w-full px-6 py-4 whitespace-no-wrap border-b">
            {editedLatitude}
          </td>
          <td className="w-full px-6 py-4 whitespace-no-wrap border-b">
            {editedLongitude}
          </td>
          <td>
            <div
              className={`group flex h-7 w-7 items-center justify-center rounded-lg bg-white ${
                !hideIcons ? ' cursor-pointer hover:bg-gray-50' : ''
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
                !hideIcons ? ' cursor-pointer hover:bg-gray-50' : ''
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
              name={editedName}
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
