import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CustomProvider from "./Components/Context/Context";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Components/Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <CustomProvider>
      <App />
    </CustomProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
