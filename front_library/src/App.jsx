import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddLibrary from "./pages/AddLibrary";
import NotFound from "./pages/NotFound";
import Library from "./pages/Library";
import NavBar from "./components/NavBar";
import Show from "./pages/Show";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="search"
              element={
                <PrivateRoute>
                  <AddLibrary />
                </PrivateRoute>
              }
            />
            <Route
              path="/:type/:id"
              element={
                <PrivateRoute>
                  <Show />
                </PrivateRoute>
              }
            />
            <Route
              path=""
              element={
                <PrivateRoute>
                  <Library />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
