import { useState } from "react";
import Item from "../Item";
import NewRowItem from "../NewRowItem";

function List({
  inputArray,
  headers,
  handleCreate,
  handleDelete,
  handleUpdate,
}) {
  const [hideIcons, setHideIcons] = useState(false);

  function handleEdit(isEditing) {
    isEditing ? setHideIcons(true) : setHideIcons(false);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                {header.toUpperCase()}
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
            />
          ))}
          <NewRowItem handleCreate={handleCreate} headers={headers}/>
        </tbody>
      </table>
    </>
  );
}

export default List;
