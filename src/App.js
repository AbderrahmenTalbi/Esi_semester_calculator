import "./App.css";
import SemesterGPACalculator from "./pages/calc";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div>
      <SpeedInsights />
      <SemesterGPACalculator />
    </div>
  );
}

export default App;
