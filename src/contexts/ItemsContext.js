import React, { createContext, useState } from "react";

export const ItemsContext = createContext([]);

export const ItemsProvider = ({ children }) => {
  const [activeNode, setActiveNode] = useState([]);

  return (
    <ItemsContext.Provider value={{ activeNode, setActiveNode }}>
      {children}
    </ItemsContext.Provider>
  );
};
