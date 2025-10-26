import { Link } from "react-router-dom";
import { ActiveGamesList } from "../components";

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl lg:text-6xl mb-4">GLOOMHAVEN TAP</h1>
      <p className="text-lg lg:text-xl mb-8 lg:mb-12 font-medium">
        Your digital companion for Gloomhaven adventures!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 flex-wrap">
        <Link to="/new-scenario" className="btn-primary">
          Start New Scenario
        </Link>
        <Link to="/game" className="btn-secondary">
          Current Game
        </Link>
      </div>

      <ActiveGamesList
        title="Recent Activity"
        emptyMessage="No recent scenarios found. Start your first adventure!"
      />
    </div>
  );
};

export default Home;
