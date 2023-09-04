import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteConfirmation from '../../components/DeleteConfirmation';

function LocationItem({ name, latitude, longitude, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedLatitude, setEditedLatitude] = useState(latitude);
  const [editedLongitude, setEditedLongitude] = useState(longitude);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit({
      name: editedName,
      latitude: editedLatitude,
      longitude: editedLongitude,
    });
    setIsEditing(false);
  };

  const handleTrashIconClick = () => {
    // Open the DeleteConfirmation dialog
    console.log('Delete icon clicked')
    setIsDeleteConfirmationOpen(true);
  };
  

  return (
    <>
      {isEditing ? (
        <>
          <input
            type="text"
            className="w-full mb-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="number"
            className="w-full mb-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            value={editedLatitude}
            onChange={(e) => setEditedLatitude(e.target.value)}
          />
          <input
            type="number"
            className="w-full mb-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
            value={editedLongitude}
            onChange={(e) => setEditedLongitude(e.target.value)}
          />
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <td className="px-6 py-4 whitespace-no-wrap border-b">
            {editedName}
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b">
            {editedLatitude}
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b">
            {editedLongitude}
          </td>
          <td>
            <div
              className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white cursor-pointer hover:bg-gray-50"
              onClick={handleEditClick}
            >
              <PencilSquareIcon
                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                aria-hidden="true"
              />
            </div>
          </td>
          <td>
                <div
                  className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white cursor-pointer hover:bg-gray-50"
                  onClick={handleTrashIconClick}
                >
                  <TrashIcon
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                {isDeleteConfirmationOpen && (
                    <DeleteConfirmation onClose={() => setIsDeleteConfirmationOpen(false)} />
                )}
          </td>
        </>
      )}
    </>
  );
}

export default LocationItem;
