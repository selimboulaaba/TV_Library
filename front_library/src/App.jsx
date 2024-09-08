import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AddLibrary from "./pages/addLibrary";

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AddLibrary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
