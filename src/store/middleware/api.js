import axios from "axios";
import { fetchAPI, fetchFail, fetchSuccess } from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== fetchAPI.type) {
      return next(action);
    } else {
      const { url, onSuccess, onStart, onError, method, data } = action.payload;
      dispatch({ type: onStart });
      next(action);
      try {
        const result = await axios.request({
          baseURL: "http://localhost:9001/api",
          url,
          method,
          data,
        });

        dispatch(fetchSuccess(result.data));
        if (onSuccess) {
          dispatch({ type: onSuccess, payload: result.data });
        }
      } catch (error) {
        dispatch(fetchFail(error.message));
        if (onError) dispatch({ type: onError, payload: error.message });
      }
    }
  };

export default api;
