import React, { Component } from "react";
import Rentals from "./components/rental-graph";
import { directive } from "@babel/types";

class App extends Component {
  render() {
    return (
      <main>
        <Rentals />
      </main>
    );
  }
}

export default App;
