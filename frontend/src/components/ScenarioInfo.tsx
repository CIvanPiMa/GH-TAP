import { useState } from "react";
import type { Scenario } from "../client/types.gen";

export interface ScenarioInfoProps {
  scenario: Scenario;
  difficulty?: string;
  currentRound?: number;
  turnContent?: React.ReactNode;
  activeTab?: "rules" | "turns";
  onTabChange?: (tab: "rules" | "turns") => void;
}

const ScenarioInfo: React.FC<ScenarioInfoProps> = ({
  scenario,
  difficulty,
  currentRound,
  turnContent,
  activeTab: externalActiveTab,
  onTabChange,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<"rules" | "turns">(
    "rules",
  );

  const activeTab = externalActiveTab ?? internalActiveTab;
  const handleTabChange = (tab: "rules" | "turns") => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <div className="card h-full">
      {/* Header - Centered */}
      <div className="text-center border-b border-white/20 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gloom-white mb-2">
          #{scenario.id}: {scenario.name}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="px-3 py-1 bg-gloom-brown/20 border border-gloom-brown/40 rounded-lg text-sm font-medium">
            Level: {scenario.level}
          </span>
          {difficulty && (
            <span className="px-3 py-1 bg-gloom-brown/20 border border-gloom-brown/40 rounded-lg text-sm font-medium">
              Difficulty: {difficulty}
            </span>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-white/20">
          <button
            onClick={() => handleTabChange("rules")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "rules"
                ? "border-gloom-brown-light text-gloom-brown-light"
                : "border-transparent text-white/60 hover:text-white/80"
            }`}
          >
            Rules
          </button>
          <button
            onClick={() => handleTabChange("turns")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "turns"
                ? "border-gloom-brown-light text-gloom-brown-light"
                : "border-transparent text-white/60 hover:text-white/80"
            }`}
          >
            Turns
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "rules" && (
            <>
              {/* Special Rules */}
              {scenario.special_rules.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gloom-brown-light mb-3">
                    Special Rules
                  </h3>
                  <div className="space-y-2">
                    {scenario.special_rules.map((rule, index) => (
                      <div
                        key={index}
                        className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded"
                      >
                        <p className="text-white/90 text-sm leading-relaxed">
                          {rule}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Goals */}
              {scenario.goals.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gloom-brown-light mb-3">
                    Scenario Goals
                  </h3>
                  <div className="space-y-2">
                    {scenario.goals.map((goal, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-500/10 border border-green-500/30 rounded"
                      >
                        <p className="text-white/90 text-sm leading-relaxed">
                          {goal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show message if no rules or goals */}
              {scenario.special_rules.length === 0 &&
                scenario.goals.length === 0 && (
                  <div className="text-center text-white/60 italic">
                    No special rules or goals defined for this scenario.
                  </div>
                )}
            </>
          )}

          {activeTab === "turns" && (
            <div>
              {turnContent ? (
                turnContent
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gloom-brown-light mb-3">
                    Turn Order & Management
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-500/10 border border-gray-500/30 rounded">
                      <h4 className="font-semibold text-white mb-2">
                        Round Actions
                      </h4>
                      <div className="text-sm text-white/70 space-y-1">
                        <p>• Select character abilities</p>
                        <p>• Reveal monster abilities</p>
                        <p>• Determine initiative order</p>
                        <p>• Execute actions in order</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioInfo;
