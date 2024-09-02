import { addBug } from "./store/bugs";
import { store } from "./store/ConfigureStore";

//UI LAYER
store.dispatch(addBug({ description: "a" }));
