import Vote from "./UI/Vote";
import Create from "./UI/Create";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router className="appContainer">
        <div>
          <nav>
            <ul className="nav">
              <li>
                <Link to="/">Vote</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/" element={<Vote />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </Router>
      <footer className="footer">
        <p>Tomer Becker</p>
        </footer>
    </>
  );
}

export default App;
