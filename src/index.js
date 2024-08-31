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
import { fetchAPI, fetchFail, fetchSuccess } from "./store/api";

store.dispatch(
  fetchAPI({
    url: "/bugs",
    onSuccess: fetchSuccess.type,
  })
);
