import { addBug, assignBug } from "./store/bugs";
import { store } from "./store/ConfigureStore";
import { resolveBug, loadBugs } from "./store/bugs";

//UI LAYER
// store.dispatch(addBug({ description: "a" }));
// store.dispatch(assignBug( 1 , 4));
store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBug(1, 4)), 2000);
