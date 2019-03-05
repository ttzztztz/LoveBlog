import React, { Component } from "react";

import { BrowserRouter } from "react-router-dom";
import Index from "./Views/Index";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        );
    }
}

export default App;
