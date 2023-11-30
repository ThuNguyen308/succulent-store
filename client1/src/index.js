import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/overwriteBootstrap/custom.scss";
import "./styles/main.scss";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

import store from "./redux/store";
import { SearchProvider } from "./context/search";
import ErrorBoundary from "./components/ErrorBoudary/ErrorBoundary";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#407e6f",
          },
        }}
      >
        <SearchProvider>
          <App />
        </SearchProvider>
      </ConfigProvider>
    </Provider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
