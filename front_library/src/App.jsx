import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AddLibrary from "./pages/AddLibrary";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/search' >
          <Route path='' element={<AddLibrary />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
