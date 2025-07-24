import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import TestePage from "./pages/TestePage";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Alo alo, tá funfando?</h1>}/>
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