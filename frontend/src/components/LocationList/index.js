import { useState} from "react";
import LocationItem from '../LocationItem';


function LocationList({locations}) {
    const [hideIcons, setHideIcons] = useState(false);
  
    const handleUpdateItem = (editedItem) => {
      console.log("handleEditItem initiated")
    };
    const handleEdit = (isEditing) => {
        isEditing ? setHideIcons(true) : setHideIcons(false)
      };


  
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
        <tbody>
        {locations.map((location) => (
          <LocationItem
            key={location._id}
            id={location._id}
            name={location.name}
            latitude={location.coordinates[1]}
            longitude={location.coordinates[0]}
            onUpdate={handleUpdateItem}
            onEdit={handleEdit}
            hideIcons={hideIcons}
          />
        ))}
        </tbody>
      </table>
      </>
    );
  }
  
  export default LocationList;