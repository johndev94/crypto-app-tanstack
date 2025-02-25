import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Todos from "./Components/Todo";
import Projects from "./Components/Projects";
import Products from "./Components/Products";

function App() {
  return (
    <>
      {/* <Projects /> */}
      <Products />
      {/* <Todos /> */}
    </>
  );
}

export default App;
