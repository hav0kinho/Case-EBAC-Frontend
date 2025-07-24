import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import TestePage from "./pages/TestePage";
import PublicCatalogPage from "./pages/PublicCatalogPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<PublicCatalogPage/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={
        <PrivateRoute>
          <AdminDashboard/>
        </PrivateRoute>
      }/>
    </Routes>
  </BrowserRouter>
}

export default App;