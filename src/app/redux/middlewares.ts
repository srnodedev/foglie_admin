import isPromise from "is-promise";

import { IError } from "../core/models";
import {
  generateErrorActionTypeName,
  generatePendingActionTypeName,
  generateSuccessActionTypeName,
} from "../core/redux";

const isFunction = (f: any) => typeof f === "function";

export const reduxPromiseMiddleware = ({ dispatch }: any): any => (next: any) => (action: any) => {
  if (isPromise(action.payload)) {
    const { type, payload } = action;
    const timestamp = +new Date();
    const meta = {
      ...action.meta,
      timestamp,
    };

    dispatch({
      meta,
      type: generatePendingActionTypeName(type),
    });

    return payload.then(
      (result: any) => {
        dispatch({
          meta,
          payload: result,
          type: generateSuccessActionTypeName(type),
        });

        return result;
      },
      (error: IError) => {
        dispatch({
          meta,
          payload: error,
          type: generateErrorActionTypeName(type),
        });

        return Promise.reject(error);
      },
    );
  } else {
    return next(action);
  }
};

export const confirmationMiddleware = ({ dispatch }: any): any => (next: any) => (action: any) => {
  if (isFunction(action.payload) && action?.meta?.confirmation) {
    const result = window.confirm(action?.meta?.confirmation.title);

    if (result) {
      return dispatch({
        ...action,
        payload: action.payload(),
      });
    } else {
      return Promise.reject();
    }
  } else {
    return next(action);
  }
};
