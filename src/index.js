import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from 'redux-persist/integration/react';

import "./index.css";
import { Provider } from "react-redux";
import { store ,persistor} from "../src/app/store";

import Main from "./components/Index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    
      
        <Main />
        </PersistGate>
      
  </Provider>
);