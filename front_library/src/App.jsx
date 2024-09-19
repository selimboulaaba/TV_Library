import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AddLibrary from "./pages/AddLibrary";
import NotFound from "./pages/NotFound";
import Library from "./pages/Library";
import NavBar from "./components/NavBar";
import Show from "./pages/Show";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='search' element={<AddLibrary />} />
        <Route path='/:type/:id' element={<Show />} />
        <Route path='' element={<Library />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
