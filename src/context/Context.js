import React from "react";

export const INIAL_STATE = {
  user: JSON.parse(window.localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

export const Context = React.createContext(INIAL_STATE);
