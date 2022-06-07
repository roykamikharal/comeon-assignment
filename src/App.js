import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./views/Authentication/SignIn";
import Home from "./views/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLayout from "./layout/HomeLayout";
import SinglePage from "./views/SinglePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeLayout>
                <Home />
              </HomeLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/:id"
          element={
            <ProtectedRoute>
              <HomeLayout>
                <SinglePage />
              </HomeLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
