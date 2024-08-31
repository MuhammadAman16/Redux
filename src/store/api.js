import { createAction } from "@reduxjs/toolkit";

export const fetchAPI = createAction("api/fetch");
export const fetchSuccess = createAction("api/success");
export const fetchFail = createAction("api/fail");
