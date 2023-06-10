import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Game from "./App";
import Header from "./Header";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <header>
      <Header />
    </header>
    <Game />
  </StrictMode>
);