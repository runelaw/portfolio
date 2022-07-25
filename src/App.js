import React, { useState } from "react";

import "./App.scss";

import {
  About,
  Contact,
  Header,
  Skills,
  Testimonial,
  Work,
} from "./containers";

import { Navbar } from "./components/index";

const App = () => {
  const [swipe, setSwipe] = useState(0);

  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial swipe={swipe} setSwipe={setSwipe} />
      <Contact swipe={swipe} />
    </div>
  );
};

export default App;
