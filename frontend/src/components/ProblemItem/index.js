import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  HandThumbUpIcon,
  EllipsisHorizontalIcon,
  BoltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Select from "react-select";
import DeleteConfirmation from "../DeleteConfirmation";

function ProblemItem({
  inputItem,
  headers,
  handleEdit,
  hideIcons,
  handleDelete,
  handleUpdate,
  handleSubmitProblem,
  dropdownLists,
  submissions,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const initialEditedRow = Object.fromEntries(
    headers.map((header) => {
      if (header === "longitude") {
        return [header, inputItem.coordinates[0]];
      } else if (header === "latitude") {
        return [header, inputItem.coordinates[1]];
      } else if (
        header === "breaks" ||
        header === "capabilities" ||
        header === "capacities" ||
        header === "start_location" ||
        header === "end_location" ||
        header === "location" ||
        header === "from" ||
        header === "to" ||
        header === "requirements"
      ) {
        return [header, inputItem[header]._id];
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

  function handleMultiSelectChange(e, metadata) {
    setEditedRow({ ...editedRow, [metadata.name]: e });
  }

  const handleChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    handleUpdate(inputItem._id, editedRow);
    setIsEditing(false);
    handleEdit(false);
  };

  const handleCancelClick = () => {
    setEditedRow(initialEditedRow);
    setIsEditing(false);
    handleEdit(false);
  };

  const handleTrashIconClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleArrowUpTrayIconClick = () => {
    handleSubmitProblem(inputItem._id);
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
          <td className="border-b"></td>
          {headers.map((header) => (
            <td key={header} className=" px4 py-2 whitespace-no-wrap border-b">
              {header === "routing_profile" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    <option value="driving">driving</option>
                    <option value="driving-traffic">driving-traffic</option>
                    <option value="cycling">cycling</option>
                    <option value="walking">walking</option>
                  </select>
                </>
              ) : header === "start_location" ||
                header === "end_location" ||
                header === "from" ||
                header === "to" ||
                header === "location" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    {dropdownLists.locations.map((opt) => (
                      <option key={opt._id} value={opt._id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : header === "capacities" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    {dropdownLists.capacities.map((opt) => (
                      <option key={opt._id} value={opt._id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : header === "capabilities" || header === "requirements" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    {dropdownLists.capabilities.map((opt) => (
                      <option key={opt._id} value={opt._id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : header === "breaks" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    {dropdownLists.breaks.map((opt) => (
                      <option key={opt._id} value={opt._id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : header === "loading_policy" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    <option value="any">any</option>
                    <option value="fifo">fifo</option>
                    <option value="lifo">lifo</option>
                  </select>
                </>
              ) : header === "type" ||
                header === "type_pickup" ||
                header === "type_dropoff" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    <option value="strict">strict</option>
                    <option value="soft">soft</option>
                    <option value="soft_start">soft_start</option>
                    <option value="soft_end">soft_end</option>
                  </select>
                </>
              ) : header === "objectives" ? (
                <>
                  <select
                    name={header}
                    className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
                    value={editedRow[header]}
                    onChange={handleChange}
                  >
                    <option value="min-schedule-completion-time">
                      Min Longest Schedule
                    </option>
                    <option value="min-total-travel-duration">
                      Min Travel Time
                    </option>
                  </select>
                </>
              ) : header === "vehicles" ||
                header === "services" ||
                header === "shipments" ? (
                <div className="w-full border-2 rounded focus:outline-none focus:border-blue-500 control-height">
                  <Select
                    isMulti
                    name={header}
                    value={editedRow[header]}
                    options={dropdownLists[header].map(({ _id, name }) => {
                      return { value: _id, label: name };
                    })}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    setValue
                    onChange={handleMultiSelectChange}
                  />
                </div>
              ) : (
                <input
                  name={header}
                  type={
                    header === "name"
                      ? "text"
                      : header === "earliest_start" ||
                        header === "latest_end" ||
                        header === "earliest" ||
                        header === "latest" ||
                        header === "earliest_pickup" ||
                        header === "latest_pickup" ||
                        header === "earliest_dropoff" ||
                        header === "latest_dropoff"
                      ? "datetime-local"
                      : "number"
                  }
                  className={`w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 ${
                    header === "earliest_start" ||
                    header === "latest_end" ||
                    header === "earliest" ||
                    header === "latest" ||
                    header === "earliest_pickup" ||
                    header === "latest_pickup" ||
                    header === "earliest_dropoff" ||
                    header === "latest_dropoff"
                      ? "text-xs control-height"
                      : ""
                  }`}
                  value={editedRow[header]}
                  disabled={header === "version" ? true : false}
                  placeholder={header.charAt(0).toUpperCase() + header.slice(1)}
                  onChange={handleChange}
                />
              )}
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
          <td className="border-b">
            <div className="group flex h-7 w-7 items-center justify-center rounded-lg bg-white">
              {submissions.find(
                (item) => item.id === inputItem.submissions[0].id
              )?.status === "complete" ? (
                <CheckCircleIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              ) : submissions.find(
                  (item) => item.id === inputItem.submissions[0].id
                )?.status === "processing" ? (
                <BoltIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              ) : submissions.find(
                  (item) => item.id === inputItem.submissions[0].id
                )?.status === "ok" ? (
                <HandThumbUpIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              ) : submissions.find(
                  (item) => item.id === inputItem.submissions[0].id
                )?.status === "pending" ? (
                <EllipsisHorizontalIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              ) : (
                <></>
              )}
            </div>
          </td>
          {headers.map((header) => (
            <td key={header} className=" px4 py-2 whitespace-no-wrap border-b">
              <div className="w-full px-2 py-2 border-2 border-white rounded">
                {header === "breaks" ||
                header === "capabilities" ||
                header === "capacities"
                  ? dropdownLists[header].find(
                      (item) => item._id === editedRow[header]
                    ).name
                  : header === "start_location" ||
                    header === "end_location" ||
                    header === "location" ||
                    header === "from" ||
                    header === "to"
                  ? dropdownLists.locations.find(
                      (item) => item._id === editedRow[header]
                    ).name
                  : header === "requirements"
                  ? dropdownLists.capabilities.find(
                      (item) => item._id === editedRow[header]
                    ).name
                  : header === "vehicles" ||
                    header === "services" ||
                    header === "shipments"
                  ? editedRow[header]
                      .map(({ label }) => {
                        return label;
                      })
                      .join(", ")
                  : editedRow[header]}
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
              onClick={!hideIcons ? handleArrowUpTrayIconClick : null}
            >
              {isHovered && !hideIcons && (
                <ArrowUpTrayIcon
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

export default ProblemItem;
