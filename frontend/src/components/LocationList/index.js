// import { useState} from "react";
import LocationItem from '../LocationItem';


function LocationList({locations}) {
    // const [items, setItems] = useState([
    //   { id: 1, name: 'Item 1', latitude: 1.234, longitude: 5.678 },
    //   { id: 2, name: 'Item 2', latitude: 2.345, longitude: 6.789 },
    // ]);
  
    const handleEditItem = (editedItem) => {
      // Update the item in the list with the edited values
      console.log("handleEditItem initiated")
    //   setItems((prevItems) =>
    //     prevItems.map((item) =>
    //       item.id === editedItem.id ? { ...item, ...editedItem } : item
    //     )
    //   );
    };

    // console.log(locations);
  
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
          <tr key={location._id} className="p-4 mb-4">    
          <LocationItem
            key={location._id}
            name={location.name}
            latitude={location.coordinates[1]}
            longitude={location.coordinates[0]}
            onEdit={handleEditItem}
          />
          </tr>
        ))}
        
        </tbody>
      </table>
      </>
    );
  }
  
  export default LocationList;