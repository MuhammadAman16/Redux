import {
  bugAdded,
  bugResolved,
  unresolvedBugSelector,
  bugAssignedtoUser,
  bugsByUserSelector,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { store } from "./store/ConfigureStore";
import { userAdded } from "./store/users";

// subscribe method returns a function to unsubscribe from the store
// const unsubscribe = store.subscribe(() => {
//   console.log("store changed", store.getState().reducer);
// });

store.dispatch(userAdded({ name: "Muhammad Aman" }));

// ConfigureStore.dispatch(projectAdded({ name: "test1" }));
// ConfigureStore.dispatch(bugAdded({ description: "Bug1" }));
// ConfigureStore.dispatch(bugAdded({ description: "Bug2" }));
// ConfigureStore.dispatch(bugAdded({ description: "Bug3" }));
// ConfigureStore.dispatch(userAdded({ name: "Test 2" }));
// CoeStore.dispatch(bugAssignedtoUser({ userId: 1, bugId: 1 }));
// ConfigureStore.dispatch(bugResolved({ id: 1 }));
// console.log(bugAdded());nfigur

// const unresolvedBugs = unresolvedBugSelector(ConfigureStore.getState());
//passing arguments to two functions
const assignedBugs = bugsByUserSelector(2)(store.getState());

console.log(assignedBugs);
