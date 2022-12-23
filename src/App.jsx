import React from "react";
import { Context, INIAL_STATE } from "./context/Context";
import TopBar from "./components/TopBar/TopBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Settings from "./pages/Settings/Settings";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import { reducer } from "./context/Reducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, INIAL_STATE);

  return (
    <Context.Provider value={{ dispatch, state }}>
      {state.user && <TopBar />}
      <Routes>
        <Route path="/" element={state.user ? <Home /> : <Register />} />
        <Route path="/login" element={state.user ? <Home /> : <Login />} />
        <Route
          path="/register"
          element={state.user ? <Home /> : <Register />}
        />
        <Route path="/write" element={state.user ? <Write /> : <Register />} />
        <Route
          path="/post/:postId"
          element={state.user ? <Single /> : <Register />}
        />
        <Route path="/set" element={state.user ? <Settings /> : <Register />} />
      </Routes>
    </Context.Provider>
  );
}
