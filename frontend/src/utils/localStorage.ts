/**
 * Utility functions for browser localStorage operations
 */

/**
 * Reads data from localStorage and parses it as JSON
 * @param key - The key to read from localStorage
 * @param defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns The parsed value or default value
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Writes data to localStorage as JSON
 * @param key - The key to store the data under
 * @param value - The value to store (will be JSON stringified)
 */
export function setToLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

/**
 * Removes an item from localStorage
 * @param key - The key to remove
 */
export function removeFromLocalStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Checks if a key exists in localStorage
 * @param key - The key to check
 * @returns True if the key exists, false otherwise
 */
export function hasInLocalStorage(key: string): boolean {
  try {
    return window.localStorage.getItem(key) !== null;
  } catch (error) {
    console.warn(`Error checking localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Clears all localStorage data
 */
export function clearLocalStorage(): void {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Gets all keys from localStorage
 * @returns Array of all localStorage keys
 */
export function getLocalStorageKeys(): string[] {
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
}

// Common localStorage keys for your application
export const STORAGE_KEYS = {
  GAMES: "gh-tap-games",
  CURRENT_GAME: "gh-tap-current-game",
  GAME_STATE: "gh-tap-game-state",
} as const;
