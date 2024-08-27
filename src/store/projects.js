import { createSlice } from "@reduxjs/toolkit";

let Id = 0;
const projects = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (projects, actions) => {
      projects.push({
        id: ++Id,
        name: actions.payload.name,
      });
    },
  },
});

export const { projectAdded } = projects.actions;
export default projects.reducer;
