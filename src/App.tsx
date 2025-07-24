import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import TestePage from "./pages/TestePage";
import PublicCatalogPage from "./pages/PublicCatalogPage";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<PublicCatalogPage/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/teste" element={
        <PrivateRoute>
          <TestePage/>
        </PrivateRoute>
      }/>
    </Routes>
  </BrowserRouter>
}

export default App;