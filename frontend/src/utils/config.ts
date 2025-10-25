/**
 * Configuration constants for the GH-TAP frontend application
 *
 * This file centralizes all configuration values used throughout the application,
 * including API endpoints, asset paths, theme colors, and other constants.
 */

// API Configuration
export const API_CONFIG = {
  VERSION: import.meta.env.VITE_GH_TAP_API_VERSION || "v1",
  BASE_URL: import.meta.env.VITE_GH_TAP_API_URL_BASE || "http://localhost:8000",
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: "GH-TAP",
  DESCRIPTION: "Gloomhaven Turn Action Planner",
} as const;

// Utility function to get full API URL
export const getApiUrl = (endpoint?: string): string => {
  const baseUrl = `${API_CONFIG.BASE_URL}/api/${API_CONFIG.VERSION}`;
  return endpoint ? `${baseUrl}/${endpoint}` : baseUrl;
};

// Utility function to get asset URL
export const getAssetUrl = (path: string): string => {
  return path.startsWith("/") ? path : `${ASSET_PATHS.GH_ASSETS}/${path}`;
};

// Asset Paths
export const ASSET_PATHS = {
  // Base path for Gloomhaven assets
  GH_ASSETS: "/gh_assets",

  // Icon paths
  ICONS: {
    CLASS_ICONS_BASE: "/gh_assets/icon_pack/class_icons_and_augments",
    ELEMENT_ICONS: "/gh_assets/icon_pack/element_icons",
    GENERAL_ICONS: "/gh_assets/icon_pack/general_icons",
    STATUS_EFFECT_ICONS: "/gh_assets/icon_pack/status_effect_icons",
    EQUIP_SLOTS: "/gh_assets/icon_pack/equip_slots",
    EVENT_CARD_ICONS: "/gh_assets/icon_pack/event_card_icons",
  },

  // Card and game assets
  CARDS: {
    BATTLE_GOALS: "/gh_assets/battle_goals",
    BATTLE_GOAL_BACK: "/gh_assets/battle_goals/battle_goal_back.jpg",
    CHARACTER_ABILITY_CARDS: "/gh_assets/character_ability_cards",
    MONSTER_ABILITY_CARDS: "/gh_assets/monster_ability_cards",
    MONSTER_STAT_CARDS: "/gh_assets/monster_stat_cards",
    ITEM_CARDS: "/gh_assets/item_cards",
    ATTACK_MODIFIERS: "/gh_assets/attack_modifiers",
    PERSONAL_QUEST: "/gh_assets/personal_quest",
    RANDOM_SCENARIO_CARDS: "/gh_assets/random_scenario_cards",
  },

  // Map and scenario assets
  MAP: {
    BASE: "/gh_assets/map",
    SCENARIO_BOOK: "/gh_assets/scenario_book",
    BACKGROUNDS: "/gh_assets/scenario_book/backgrounds",
    SCENARIO_TILES: "/gh_assets/scenario_book/scenario_tiles",
    TOKENS: "/gh_assets/scenario_book/tokens",
    MONSTERS: "/gh_assets/scenario_book/monsters",
    SCENARIO_ICONS: "/gh_assets/scenario_book/icons",
  },

  // City and road events
  EVENTS: {
    CITY_AND_ROAD: "/gh_assets/city_and_road_events",
  },

  // Character class mats
  CHARACTER: {
    CLASS_MATS: "/gh_assets/character_class_mat",
  },

  // Glyphs
  GLYPHS: "/gh_assets/glyphs",
} as const;

// Character Icon Mapping
export const CHARACTER_ICONS: Record<string, string> = {
  "1": `${ASSET_PATHS.ICONS.CLASS_ICONS_BASE}/0014.jpg`, // Silent Knife
  "2": `${ASSET_PATHS.ICONS.CLASS_ICONS_BASE}/0015.jpg`, // Brute
  "3": `${ASSET_PATHS.ICONS.CLASS_ICONS_BASE}/0016.jpg`, // Spellweaver
  "4": `${ASSET_PATHS.ICONS.CLASS_ICONS_BASE}/0017.jpg`, // Cragheart
  "5": `${ASSET_PATHS.ICONS.CLASS_ICONS_BASE}/0018.jpg`, // Mindthief
  "6": `${ASSET_PATHS.ICONS.CLASS_ICONS_BASE}/0019.jpg`, // Tinkerer
};
