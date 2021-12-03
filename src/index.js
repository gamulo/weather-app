import React from "react";
import "./App.css";
import WeatherApp from "./component/WeatherApp";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return <WeatherApp />;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
