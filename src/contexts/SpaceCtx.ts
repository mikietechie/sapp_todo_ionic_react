import { createContext } from "react";

export type SPACE = "blog" | "todo" | "space"
export interface SpaceCtxType {
    space: SPACE;
    setSpace: (space: SPACE) => void;
}

export const SpaceCtx = createContext<SpaceCtxType | null>(null)
