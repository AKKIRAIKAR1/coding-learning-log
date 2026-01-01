import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import CreateBook from "./pages/CreateBook";
import AddSnippet from "./pages/AddSnippet";
import ViewBooks from "./pages/ViewBooks";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-book" element={<CreateBook />} />
        <Route path="/add-snippet" element={<AddSnippet />} />
        <Route path="/view-books" element={<ViewBooks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
