import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));


// const store = createStore (
//     reducer,
//     applyMiddleware(thunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store