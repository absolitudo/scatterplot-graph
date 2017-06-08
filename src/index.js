import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import { Provider } from "react-redux"
import { createStore } from "redux"

/* Reducer */
import reducer from "./reducers/reducer"

/* Components */
import Graph from "./components/graph"

/* Store */
const store = createStore(reducer)

class App extends React.Component {
    render() {
        return(
            <Graph />
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
