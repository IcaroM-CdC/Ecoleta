import { Route, BrowserRouter} from "react-router-dom"
import React from "react"

import Home from "./pages/home/index"
import CreatePoint from "./pages/createpoint/index"

function Routes() {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact={true}/>
            <Route component={CreatePoint} path="/criar-ponto"/>
        </BrowserRouter>
    )
}

export default Routes