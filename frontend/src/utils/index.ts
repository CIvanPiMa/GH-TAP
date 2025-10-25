/**
 * Utility functions for the GH-TAP application
 */

import { ASSET_PATHS, CHARACTER_ICONS, DEFAULT_CHARACTER_ICON } from "./config";

/**
 * Get the icon path for a character by ID
 * @param characterId - The character ID
 * @returns The full path to the character icon
 */
export const getCharacterIconPath = (characterId: string): string => {
  return CHARACTER_ICONS[characterId] || DEFAULT_CHARACTER_ICON;
};

/**
 * Get the path to a battle goal card
 * @param filename - The filename of the battle goal card
 * @returns The full path to the battle goal card
 */
export const getBattleGoalPath = (filename: string): string => {
  return `${ASSET_PATHS.CARDS.BATTLE_GOALS}/${filename}`;
};

/**
 * Get the path to a monster ability card
 * @param filename - The filename of the monster ability card
 * @returns The full path to the monster ability card
 */
export const getMonsterAbilityCardPath = (filename: string): string => {
  return `${ASSET_PATHS.CARDS.MONSTER_ABILITY_CARDS}/${filename}`;
};

/**
 * Get the path to a character ability card
 * @param filename - The filename of the character ability card
 * @returns The full path to the character ability card
 */
export const getCharacterAbilityCardPath = (filename: string): string => {
  return `${ASSET_PATHS.CARDS.CHARACTER_ABILITY_CARDS}/${filename}`;
};

/**
 * Get the path to a scenario background
 * @param filename - The filename of the scenario background
 * @returns The full path to the scenario background
 */
export const getScenarioBackgroundPath = (filename: string): string => {
  return `${ASSET_PATHS.MAP.BACKGROUNDS}/${filename}`;
};

/**
 * Get the path to an element icon
 * @param filename - The filename of the element icon
 * @returns The full path to the element icon
 */
export const getElementIconPath = (filename: string): string => {
  return `${ASSET_PATHS.ICONS.ELEMENT_ICONS}/${filename}`;
};

/**
 * Get the path to a status effect icon
 * @param filename - The filename of the status effect icon
 * @returns The full path to the status effect icon
 */
export const getStatusEffectIconPath = (filename: string): string => {
  return `${ASSET_PATHS.ICONS.STATUS_EFFECT_ICONS}/${filename}`;
};
