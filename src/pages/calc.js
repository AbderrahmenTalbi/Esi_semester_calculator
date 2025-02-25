import { useState } from "react";
import { motion } from "framer-motion";

export default function SemesterGPACalculator() {
  const [modules, setModules] = useState([
    {
      name: "",
      coefficient: "",
      weightExam: "",
      weightTd: "",
      exam: "",
      td: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedModules = [...modules];

    const sanitizeNumberInput = (input) => {
      if (input === "") return "";
      const numericValue = input.replace(/[^0-9.]/g, "");
      return numericValue;
    };

    if (
      field === "coefficient" ||
      field === "weightExam" ||
      field === "exam" ||
      field === "td"
    ) {
      value = sanitizeNumberInput(value);
    }

    if (field === "coefficient") {
      value = value === "" ? "" : Math.min(5, Math.max(1, Number(value)));
    }

    if (field === "weightExam") {
      const weightExamValue =
        value === "" ? "" : Math.min(100, Math.max(0, Number(value)));
      updatedModules[index]["weightExam"] = weightExamValue;
      updatedModules[index]["weightTd"] =
        weightExamValue === "" ? "" : 100 - weightExamValue;
    } else if (field === "exam" || field === "td") {
      value = value === "" ? "" : Math.min(20, Math.max(0, Number(value)));
    }

    updatedModules[index][field] = value;
    setModules(updatedModules);
  };

  const calculateModuleAverage = (exam, td, weightExam, weightTd) => {
    if (exam !== "" && td !== "" && weightExam !== "" && weightTd !== "") {
      return (exam * (weightExam / 100) + td * (weightTd / 100)).toFixed(2);
    }
    return "-";
  };

  const calculateAverage = () => {
    let totalScore = 0,
      totalCoefficients = 0;
    modules.forEach(({ exam, td, weightExam, weightTd, coefficient }) => {
      if (
        exam !== "" &&
        td !== "" &&
        weightExam !== "" &&
        weightTd !== "" &&
        coefficient !== ""
      ) {
        totalScore +=
          (exam * (weightExam / 100) + td * (weightTd / 100)) *
          Number(coefficient);
        totalCoefficients += Number(coefficient);
      }
    });
    return totalCoefficients > 0
      ? (totalScore / totalCoefficients).toFixed(2)
      : "0.00";
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
        name: "",
        coefficient: "",
        weightExam: "",
        weightTd: "",
        exam: "",
        td: "",
      },
    ]);
  };
  const clearModule = (index) => {
    const updatedModules = [...modules];
    updatedModules[index] = {
      name: updatedModules[index].name,
      coefficient: "",
      weightExam: "",
      weightTd: "",
      exam: "",
      td: "",
    };
    setModules(updatedModules);
  };

  return (
    <div className="p-4 mx-auto bg-gradient-to-br from-black to-blue-950 text-white min-h-screen shadow-xl space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        ESI SEMESTER CALCULATOR
      </h1>
      <div className="space-y-4">
        {modules.map((module, index) => {
          const moduleAverage = calculateModuleAverage(
            module.exam,
            module.td,
            module.weightExam,
            module.weightTd
          );
          const isPassed = moduleAverage !== "-" && Number(moduleAverage) >= 10;
          return (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row flex-wrap items-center gap-2 p-4 bg-white rounded-lg shadow-md text-black justify-between"
            >
              <input
                type="text"
                placeholder="Module Name"
                value={module.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="border p-2 rounded-md w-full md:w-24 text-center"
              />
              <input
                type="number"
                placeholder="Coef"
                value={module.coefficient}
                onChange={(e) =>
                  handleChange(index, "coefficient", e.target.value)
                }
                min="1"
                max="5"
                className="border p-2 rounded-md w-full md:w-14 text-center no-arrows"
              />
              <input
                type="number"
                placeholder="% Exam"
                value={module.weightExam}
                onChange={(e) =>
                  handleChange(index, "weightExam", e.target.value)
                }
                min="0"
                max="100"
                className="border p-2 rounded-md w-full md:w-20 text-center no-arrows"
              />
              <input
                type="text"
                placeholder="% TD"
                value={module.weightTd}
                disabled
                className="border p-2 rounded-md w-full md:w-20 text-center bg-gray-200"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Exam"
                value={module.exam}
                onChange={(e) => handleChange(index, "exam", e.target.value)}
                min="0"
                max="20"
                className={`border p-2 rounded-md w-full md:w-20 text-center no-arrows ${
                  module.exam !== "" && module.exam < 10
                    ? "border-red-500 text-red-600"
                    : "border-green-500 text-green-600"
                }`}
              />

              <input
                type="number"
                step="0.01"
                placeholder="TD"
                value={module.td}
                onChange={(e) => handleChange(index, "td", e.target.value)}
                min="0"
                max="20"
                className={`border p-2 rounded-md w-full md:w-20 text-center no-arrows ${
                  module.td !== "" && module.td < 10
                    ? "border-red-500 text-red-600"
                    : "border-green-500 text-green-600"
                }`}
              />
              <button
                onClick={() => clearModule(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Clear
              </button>
              <span
                className={`text-lg font-bold w-full md:w-20 text-center ${
                  isPassed ? "text-green-600" : "text-red-600"
                }`}
              >
                {moduleAverage}
              </span>
            </motion.div>
          );
        })}
      </div>
      {/* Add Module Button and Semester Average Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          onClick={addModule}
          className="bg-green-500 p-2 rounded-lg w-full md:w-auto order-2 md:order-1"
        >
          Add Module
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-center bg-white text-black p-3 rounded-lg shadow-md w-full md:w-auto order-1 md:order-2">
          Semester Average:{" "}
          <span
            className={`${
              Number(calculateAverage()) >= 10
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {calculateAverage()}
          </span>
        </h2>
      </div>
      <style>{`
        .no-arrows::-webkit-inner-spin-button, 
        .no-arrows::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-arrows {
          -moz-appearance: textfield;
        }
        .font-signature {
          font-family: 'Dancing Script', cursive;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
