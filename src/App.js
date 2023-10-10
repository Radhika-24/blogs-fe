import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Routes";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
