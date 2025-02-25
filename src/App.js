import "./App.css";
import SemesterGPACalculator from "./pages/calc";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div>
      <Analytics/>
      <SpeedInsights />
      <SemesterGPACalculator />
    </div>
  );
}

export default App;
