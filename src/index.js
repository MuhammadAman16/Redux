import { loadBugs } from "./store/bugs";
import { store } from "./store/ConfigureStore";

//UI LAYER
store.dispatch(loadBugs());
