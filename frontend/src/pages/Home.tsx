import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl lg:text-6xl mb-4 text-gloom-brown font-pirata">
        GLOOMHAVEN TAP
      </h1>
      <p className="text-lg lg:text-xl mb-8 lg:mb-12 text-black font-medium">
        Your digital companion for Gloomhaven adventures!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 flex-wrap">
        <Link to="/new-scenario" className="btn-primary">
          Start New Scenario
        </Link>
        <Link to="/scenario" className="btn-secondary">
          Current Scenario
        </Link>
      </div>

      <div className="card text-left">
        <h2 className="text-2xl mb-4 text-gloom-brown font-pirata">
          Recent Activity
        </h2>
        <p className="text-white/70">
          No recent scenarios found. Start your first adventure!
        </p>
      </div>
    </div>
  );
};

export default Home;
