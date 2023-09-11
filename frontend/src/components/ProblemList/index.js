import { useState } from "react";
import ProblemItem from "../ProblemItem";
import NewRowProblemItem from "../NewRowProblemItem";

function ProblemList({
  inputArray,
  headers,
  handleCreate,
  handleDelete,
  handleUpdate,
  handleSubmitProblem,
  dropdownLists,
  submissions,
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
            <th className="bg-gray-50"></th>
            {headers.map((header) => (
              <th key={header} className="px-3 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                {header === "routing_profile" ? "routing_mode".toUpperCase() : header === "loading_policy" ? "policy".toUpperCase() : header.toUpperCase()}
              </th>
            ))}
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inputArray.map((inputItem) => (
            <ProblemItem
              key={inputItem._id}
              inputItem={inputItem}
              headers={headers}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleSubmitProblem={handleSubmitProblem}
              hideIcons={hideIcons}
              dropdownLists={dropdownLists}
              submissions={submissions}
            />
          ))}
          <NewRowProblemItem handleCreate={handleCreate} headers={headers} dropdownLists={dropdownLists}/>
        </tbody>
      </table>
    </>
  );
}

export default ProblemList;
