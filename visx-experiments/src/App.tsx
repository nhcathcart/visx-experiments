import "./App.css";
import "../src/css/PieChart.css"
import {BarChart} from "../src/components/BarChart";
import {PieChart} from "../src/components/PieChart"
function App() {
  return (
    <>
      {/* <BarChart/> */}
      <div className="pie-container">
        <PieChart/>
      </div>
      <div className="bar-container">
        <BarChart/>
      </div>
      
    </>
  );
}

export default App;
