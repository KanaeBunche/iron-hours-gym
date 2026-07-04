import React from "react";
import ReactDOM from "react-dom/client";
import Lenis from "lenis";
import App from "./App.jsx";
import "./index.css";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
