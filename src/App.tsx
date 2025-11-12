import { Dashboard } from "./Pages/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WishPage from "./Pages/WishPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wish/:id" element={<WishPage />} />
      </Routes>
    </Router>
  );
}

export default App;
