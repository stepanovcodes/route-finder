import { useState } from "react";
import Item from "../Item";
import NewRowItem from "../NewRowItem";

function List({
  inputArray,
  headers,
  handleCreate,
  handleDelete,
  handleUpdate,
  dropdownLists,
}) {
  const [hideIcons, setHideIcons] = useState(false);

  function handleEdit(isEditing) {
    isEditing ? setHideIcons(true) : setHideIcons(false);
  }
  // console.log(inputArray)
  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                {header === "routing_profile" ? "routing_mode".toUpperCase() : header === "loading_policy" ? "policy".toUpperCase() : header.toUpperCase()}
              </th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inputArray.map((inputItem) => (
            <Item
              key={inputItem._id}
              inputItem={inputItem}
              headers={headers}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              hideIcons={hideIcons}
              dropdownLists={dropdownLists}
            />
          ))}
          <NewRowItem handleCreate={handleCreate} headers={headers} dropdownLists={dropdownLists}/>
        </tbody>
      </table>
    </>
  );
}

export default List;
