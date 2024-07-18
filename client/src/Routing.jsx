import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
