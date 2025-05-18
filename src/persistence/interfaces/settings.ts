import { Settings } from "../../models/settings";

export interface SettingsStore {
  get(): Promise<Settings>;
  put(value: Settings): Promise<void>;
  clear(): Promise<void>;
}