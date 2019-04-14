import React from "react";

const GameContext = React.createContext({
    data: [],
    progress: 0,
    updateProgress(){},
});

export const Provider = GameContext.Provider;
export const Consumer = GameContext.Consumer;
