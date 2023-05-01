import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"; // import the createSagaMiddleware function
import contactReducer from "./Redux/Reducer/contactReducer";
import { contactSagas } from "./Redux/middleware/Sagas"; // import your saga function

const sagaMiddleware = createSagaMiddleware(); // create a new instance of the saga middleware
const store = createStore(
  contactReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)) // pass saga middleware as an argument to applyMiddleware
);
const root = ReactDOM.createRoot(document.getElementById("root")!);

sagaMiddleware.run(contactSagas); // run the saga middleware

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
