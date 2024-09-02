import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAPI } from "./api";
import moment from "moment";

const bugSlice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // /bugs/bugReceived
    bugsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugRequestFailed: (state, action) => {
      state.loading = false;
    },
    //ACTIONS => ACTION HANDLERS
    bugAdded: (state, action) => {
      state.list.push({
        description: action.payload.description,
      });
    },
    bugRemoved: (state, action) => {
      return state.list.filter((bug) => bug.id !== action.payload.id);
    },
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      if (index !== -1) {
        state.list[index].resolved = true;
      }
    },
    bugAssignedtoUser: (bugs, action) => {
      const { userId, bugId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssignedtoUser,
  bugsReceived,
  bugsRequested,
  bugRequestFailed,
} = bugSlice.actions;
export default bugSlice.reducer;

const url = "/bugs";

//ACTION CREATERS
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;

  dispatch(
    fetchAPI({
      url,
      onStart: bugsRequested.type,
      onError: bugRequestFailed.type,
      onSuccess: bugsReceived.type,
    })
  );
};

export const addBug = (bug) =>
  fetchAPI({
    url,
    method: "post",
    data: bug, // req.body
    onSuccess: bugAdded.type,
  });

// GETTERS
export const unresolvedBugSelector = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const bugsByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId == userId)
  );
