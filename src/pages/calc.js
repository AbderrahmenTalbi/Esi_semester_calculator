"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Calculator } from "lucide-react";

export default function SemesterGPACalculator() {
  const [modules, setModules] = useState([
    { name: "", coefficient: "", weightExam: "", weightTd: "", exam: "", td: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedModules = [...modules];

    const sanitizeNumberInput = (input) => {
      if (input === "") return "";
      return input.replace(/[^0-9.]/g, "");
    };

    if (["coefficient", "weightExam", "exam", "td"].includes(field)) {
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
      { name: "", coefficient: "", weightExam: "", weightTd: "", exam: "", td: "" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-black p-6 flex flex-col items-center text-white">
      {/* Header */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold tracking-wide text-center mb-8"
      >
        🎓 ESI Semester GPA Calculator
      </motion.h1>

      {/* Module List */}
      <div className="w-full max-w-4xl space-y-6">
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-5 grid grid-cols-2 md:grid-cols-7 gap-3 items-center"
            >
              <input
                type="text"
                placeholder="Module"
                value={module.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="p-2 rounded-lg bg-white/90 text-black text-center placeholder:text-gray-500"
              />
              <input
                type="number"
                placeholder="Coef"
                value={module.coefficient}
                onChange={(e) =>
                  handleChange(index, "coefficient", e.target.value)
                }
                className="p-2 rounded-lg bg-white/90 text-black text-center"
              />
              <input
                type="number"
                placeholder="% Exam"
                value={module.weightExam}
                onChange={(e) =>
                  handleChange(index, "weightExam", e.target.value)
                }
                className="p-2 rounded-lg bg-white/90 text-black text-center"
              />
              <input
                type="text"
                placeholder="% TD"
                value={module.weightTd}
                disabled
                className="p-2 rounded-lg bg-gray-200 text-center font-semibold"
              />
              <input
                type="number"
                placeholder="Exam"
                value={module.exam}
                onChange={(e) => handleChange(index, "exam", e.target.value)}
                className={`p-2 rounded-lg text-center ${
                  module.exam !== "" && module.exam < 10
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              />
              <input
                type="number"
                placeholder="TD"
                value={module.td}
                onChange={(e) => handleChange(index, "td", e.target.value)}
                className={`p-2 rounded-lg text-center ${
                  module.td !== "" && module.td < 10
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              />
              <span
                className={`text-xl font-bold text-center ${
                  isPassed ? "text-green-400" : "text-red-400"
                }`}
              >
                {moduleAverage}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6 mt-10">
        <button
          onClick={addModule}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          <PlusCircle size={20} /> Add Module
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 text-black px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 text-xl font-semibold"
        >
          <Calculator className="text-indigo-600" />
          Semester Average:
          <span
            className={`ml-2 text-2xl font-extrabold ${
              Number(calculateAverage()) >= 10
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {calculateAverage()}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
