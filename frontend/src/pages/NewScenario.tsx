import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacters, useScenarios } from "../hooks";
import type { Scenario } from "../client/types.gen";

interface ScenarioForm {
  scenario: Scenario | null;
  difficulty: string;
  character: string;
}

const NewScenario: React.FC = () => {
  const navigate = useNavigate();
  const {
    characters,
    loading: charactersLoading,
    error: charactersError,
  } = useCharacters();
  const {
    scenarios,
    loading: scenariosLoading,
    error: scenariosError,
  } = useScenarios();

  const [formData, setFormData] = useState<ScenarioForm>({
    scenario: null,
    difficulty: "normal",
    character: "",
  });

  const [scenarioSearch, setScenarioSearch] = useState("");
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);

  // Update default character when characters are loaded
  useEffect(() => {
    if (characters.length > 0 && !formData.character) {
      setFormData((prev) => ({ ...prev, character: characters[0].id }));
    }
  }, [characters, formData.character]);

  // Filter scenarios based on search
  const filteredScenarios = scenarios.filter(
    (scenario) =>
      scenario.name.toLowerCase().includes(scenarioSearch.toLowerCase()) ||
      scenario.id.includes(scenarioSearch),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.scenario) {
      alert("Please select a scenario");
      return;
    }

    if (!formData.character) {
      alert("Please select a character");
      return;
    }

    // TODO: Save scenario data and navigate to the scenario page
    console.log("New scenario created:", {
      scenario: formData.scenario,
      difficulty: formData.difficulty,
      character: formData.character,
    });
    navigate("/scenario");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-center text-gloom-brown mb-8 text-3xl font-pirata">
          Start New Scenario
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="scenario"
              className="block mb-2 font-medium text-white"
            >
              Select Scenario:
            </label>
            {scenariosLoading && (
              <div className="text-center py-4">
                <div className="text-white">Loading scenarios...</div>
              </div>
            )}
            {scenariosError && (
              <div className="text-center py-4">
                <div className="text-red-400">
                  Error loading scenarios: {scenariosError}
                </div>
              </div>
            )}
            {!scenariosLoading && !scenariosError && (
              <div className="relative">
                <input
                  type="text"
                  id="scenario"
                  value={
                    formData.scenario
                      ? `${formData.scenario.id} - ${formData.scenario.name}`
                      : scenarioSearch
                  }
                  onChange={(e) => {
                    setScenarioSearch(e.target.value);
                    setShowScenarioDropdown(true);
                    if (!e.target.value) {
                      setFormData((prev) => ({ ...prev, scenario: null }));
                    }
                  }}
                  onFocus={() => setShowScenarioDropdown(true)}
                  onBlur={() => {
                    // Delay hiding to allow click on dropdown items
                    setTimeout(() => setShowScenarioDropdown(false), 200);
                  }}
                  placeholder="Search scenarios by name or number..."
                  required
                  className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white text-lg focus:outline-none focus:border-gloom-brown focus:bg-white/10 transition-all"
                />
                {showScenarioDropdown && filteredScenarios.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-white/20 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {filteredScenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, scenario }));
                          setScenarioSearch("");
                          setShowScenarioDropdown(false);
                        }}
                        className="p-3 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 transition-colors"
                      >
                        <div className="text-white font-medium">
                          Scenario {scenario.id}: {scenario.name}
                        </div>
                        <div className="text-white/70 text-sm mt-1">
                          Level {scenario.level}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showScenarioDropdown &&
                  filteredScenarios.length === 0 &&
                  scenarioSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-white/20 rounded-lg shadow-xl p-3">
                      <div className="text-white/70">
                        No scenarios found matching "{scenarioSearch}"
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="block mb-2 font-medium text-white"
            >
              Difficulty:
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white text-lg focus:outline-none focus:border-gloom-brown focus:bg-white/10 transition-all"
            >
              <option value="very-easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
              <option value="very-hard">Very Hard</option>
            </select>
          </div>

          <div>
            <label className="block mb-4 font-medium text-white">
              Select Character:
            </label>
            {charactersLoading && (
              <div className="text-center py-8">
                <div className="text-white">Loading characters...</div>
              </div>
            )}
            {charactersError && (
              <div className="text-center py-8">
                <div className="text-red-400">
                  Error loading characters: {charactersError}
                </div>
              </div>
            )}
            {!charactersLoading && !charactersError && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        character: character.id,
                      }))
                    }
                    className={`
                      cursor-pointer rounded-lg border-2 transition-all duration-300 p-4
                      ${
                        formData.character === character.id
                          ? "border-gloom-brown bg-gloom-brown/20 shadow-lg transform scale-105"
                          : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                        <img
                          src={character.iconPath}
                          alt={character.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.nextElementSibling?.classList.remove(
                              "hidden",
                            );
                          }}
                        />
                        <div className="hidden text-white text-2xl font-bold">
                          {character.name[0]}
                        </div>
                      </div>
                      <h3 className="font-pirata text-lg text-white mb-1">
                        {character.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button type="submit" className="btn-primary">
              Start Scenario
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/30 text-white/70 border border-white/30 rounded-lg hover:text-white hover:border-white/50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewScenario;
