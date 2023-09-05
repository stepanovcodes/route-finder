import { useState } from "react";
// import { Button } from "@fluentui/react-components";
import LocationItem from "../LocationItem";
import NewLocation from "../NewLocation";
import Alert from "../../components/Alert";

function LocationList({ locations, handleSubmit, handleDelete, handleUpdate }) {
  const [hideIcons, setHideIcons] = useState(false);
  const [isValid, setIsValid] = useState(true);
//   const [newRow, setNewRow] = useState(null);


  function handleEdit(isEditing) {
    isEditing ? setHideIcons(true) : setHideIcons(false);
  }
  function handleValidation(isValidValue) {
    setIsValid(isValidValue)
  }

//   function handleAddRow() {
//     handleSubmit(newRow);
//   }

//   function handleNewRowChange(newRowCurrent) {
//     setNewRow(newRowCurrent);
//   };
// console.log(newRow);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Latitude
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Longitude
            </th>
            <th></th>
            <th></th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        {/* </table> */}
        <tbody>
          {locations.map((location) => (
            <LocationItem
              key={location._id}
              id={location._id}
              name={location.name}
              latitude={location.coordinates[1]}
              longitude={location.coordinates[0]}
              onEdit={handleEdit}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              hideIcons={hideIcons}
              
            />
          ))}
        
        <NewLocation /*handleNewRowChange={handleNewRowChange}*/ handleSubmit={handleSubmit} handleValidation={handleValidation} />
        </tbody>
      </table>
      {!isValid ? <Alert type="error" message="This is an error message." handleValidation={handleValidation}/> : ""}
    </>
  );
}

export default LocationList;
