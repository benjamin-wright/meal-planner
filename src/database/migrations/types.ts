import { IDatabaseTransport } from "../types";

export type Migration = (transport: IDatabaseTransport) => void;
