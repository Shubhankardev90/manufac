import './App.css';
import Bar from './components/Bar';
import Line from './components/Line';

function App() {
  return (
    <div className="App">
      <div className="chart-container">
        <div className="bar-chart-container">
          <Bar />
        </div>
        <div className="line-chart-container">
          <Line />
        </div>
      </div>
    </div>
  );
}

export default App;
