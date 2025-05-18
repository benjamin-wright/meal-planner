import { settings } from "../../models/settings";

export interface SettingsStore {
  get(): Promise<settings>;
  put(value: settings): Promise<void>;
  clear(): Promise<void>;
}