import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { reducers } from "./Reducers";
import { epicMiddleware, epics } from "./Epics";
import { BrowserRouter } from "react-router-dom";
import Index from "./Views/Index";

const middleware = [epicMiddleware];

export const store = createStore(reducers, applyMiddleware(...middleware));

epicMiddleware.run(epics);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Index />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
