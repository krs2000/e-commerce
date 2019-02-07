import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import createStore from "./src/state/createStore"


let store = createStore().store;
let persistor = createStore().persistor;

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <Provider store={store}><PersistGate loading={null} persistor={persistor}>{element} </PersistGate></Provider>
