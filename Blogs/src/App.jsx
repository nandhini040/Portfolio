import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/portfolio";

export default function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio/>}/>
          </Routes>
    </BrowserRouter>
  );
}
