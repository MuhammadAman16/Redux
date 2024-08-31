import axios from "axios";
import { fetchAPI, fetchFail, fetchSuccess } from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== fetchAPI.type) {
      return next(action);
    } else {
      next(action);
      const { url, onSuccess, onError, method, data } = action.payload;
      try {
        const result = await axios.request({
          baseURL: "http://localhost:9001/api",
          url,
          method,
          data,
        });
        if (onSuccess) {
          dispatch({ type: onSuccess, payload: result.data });
          return;
        }
        dispatch(fetchSuccess(result.data));
      } catch (error) {
        dispatch(fetchFail(error));
        if (onError) dispatch({ type: onError, payload: error });
        else {
        }
      }
    }
  };

export default api;
