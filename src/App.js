import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Waiting from "./pages/Waiting";
import Print from "./pages/Print";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/waiting" exact element={<Waiting />} />
          <Route path="/print" element={<Print />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
