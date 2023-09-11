import React, { useState, useEffect } from "react";

const SolutionCard = ({ problems, handleGetSolution, isSolutionLoading, solution}) => {
  const [selectedProblem, setSelectedProblem] = useState(problems.length > 0 ? problems[0].submissions[0].id : null);

  // Function to handle selection change
  const handleProblemChange = (e) => {
    const selectedValue = e.target.value;
    // console.log(selectedValue)
    setSelectedProblem(selectedValue);
    handleGetSolution(selectedValue)
  };

  useEffect(() => {
    handleGetSolution(selectedProblem);
  }, []);

//   console.log(selectedProblem)

  return (
    <div className=" px4 py-2 whitespace-no-wrap">
      <select
        className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
        onChange={handleProblemChange}
        value={selectedProblem}
      >
        {problems.map((problem) => (
           problem.submissions[0].id !== null ?
          <option key={problem.submissions[0].id} value={problem.submissions[0].id}>
            {problem.name}
          </option>
          : ''
           ))}
      </select>

      {/* {selectedProblem && !isSolutionLoading ? 
        
        
        <div className="problem-details mt-4">
          <h3 className="text-xl font-semibold mb-2">Problem Details:</h3>
          <p>Vehicle Name: solution.vehicleName}</p>
          <p>Start at Time: {problemData[selectedProblem - 1].startTime}</p>
          <p>End at Time: {problemData[selectedProblem - 1].endTime}</p>
          <p>Total Duration: {problemData[selectedProblem - 1].totalDuration}</p>
          <p>Stops number: {problemData[selectedProblem - 1].stopsNumber}</p>
          <p>List of Services: {problemData[selectedProblem - 1].services.join(", ")}</p>
          <p>List of Shipments: {problemData[selectedProblem - 1].shipments.join(", ")}</p>
          <p>Total odometer: {problemData[selectedProblem - 1].totalOdometer}</p>
        </div>
       
      :""} */}
    </div>
  );
};

export default SolutionCard;



const problemData = [
    {
      id: 1,
      name: "Problem 1",
      vehicleName: "Vehicle A",
      startTime: "09:00 AM",
      endTime: "11:30 AM",
      totalDuration: "2 hours 30 minutes",
      stopsNumber: 5,
      services: ["Service A", "Service B"],
      shipments: ["Shipment 1", "Shipment 2"],
      totalOdometer: "100 miles",
    },
    // Add more problem objects here
  ];
  
  
