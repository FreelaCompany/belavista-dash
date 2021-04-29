import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./config/ReactotronConfig";
import { store, persistor } from "./store";

import GlobalStyle from "./styles/global";
import history from "./services/history";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/painel">
          <GlobalStyle />
          <Routes history={history} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
