
import './App.css'
import FetchWeather from "./Weather";

function App() {

  return (
    <>
      <div className="body">
        <h1>Real-time Weather App</h1>
        <FetchWeather /> {/* Render the Counter component */}
      </div>
    </>
  )
}

export default App
