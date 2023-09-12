import React, { useState, useEffect } from "react";

const SolutionCard = ({
  problems,
  handleGetSolution,
  isSolutionLoading,
  solution,
}) => {
  const [selectedProblem, setSelectedProblem] = useState(
    problems.length > 0 ? problems[0].submissions[0].id : null
  );

  const handleProblemChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProblem(selectedValue);
    handleGetSolution(selectedValue);
  };

  useEffect(() => {
    handleGetSolution(selectedProblem);
  }, []);

  return (
    <div className=" px4 py-2 whitespace-no-wrap">
      <select
        className="w-full px-2 py-2 border-2 rounded focus:outline-none focus:border-blue-500 control-height"
        onChange={handleProblemChange}
        value={selectedProblem}
      >
        {problems.map((problem) =>
          problem.submissions[0].id !== null ? (
            <option
              key={problem.submissions[0].id}
              value={problem.submissions[0].id}
            >
              {problem.name}
            </option>
          ) : (
            ""
          )
        )}
      </select>
    </div>
  );
};

export default SolutionCard;
