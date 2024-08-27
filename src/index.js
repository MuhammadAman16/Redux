import { bugAdded, bugResolved, unresolvedBugSelector } from "./store/bugs";
import { projectAdded } from "./store/projects";
import ConfigureStore from "./store/ConfigureStore";

// subscribe method returns a function to unsubscribe from the store
// const unsubscribe = store.subscribe(() => {
//   console.log("store changed", store.getState().reducer);
// });

ConfigureStore.dispatch(projectAdded({ name: "test1" }));
ConfigureStore.dispatch(bugAdded({ description: "Bug1" }));
ConfigureStore.dispatch(bugAdded({ description: "Bug2" }));
ConfigureStore.dispatch(bugResolved({ id: 1 }));
// console.log(bugAdded());

const unresolvedBugs = unresolvedBugSelector(ConfigureStore.getState());
console.log(unresolvedBugs);
