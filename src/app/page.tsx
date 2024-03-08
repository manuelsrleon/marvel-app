"use client";
import HomePage from "./HomePage";
import "./page.css";
import "@fontsource/roboto";
import TopBar from "./TopBar";

function App() {
  return (
    <>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      <TopBar />
      <HomePage></HomePage>
    </>
  );
}

export default App;
