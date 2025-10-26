import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { Home, NewScenario, Game, NotFound } from "./pages";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <main className="p-4 lg:p-8 w-full box-border">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-scenario" element={<NewScenario />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
