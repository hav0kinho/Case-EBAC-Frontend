import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Alo alo, tá funfando?</h1>}/>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
}

export default App;