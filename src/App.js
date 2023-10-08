import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Routes";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { fetchApi } from "./config";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
