import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 lg:px-8 bg-white/5 border-b border-white/10 backdrop-blur-sm flex-wrap gap-4">
      <div className="nav-brand">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold text-gloom-white hover:text-gloom-brown-light transition-colors"
        >
          GH-TAP
        </Link>
      </div>

      <div className="flex gap-2 lg:gap-8 flex-wrap">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/new-scenario"
          className={`nav-link ${isActive("/new-scenario") ? "active" : ""}`}
        >
          New Scenario
        </Link>
        <Link
          to="/game"
          className={`nav-link ${isActive("/game") ? "active" : ""}`}
        >
          Current Scenario
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
