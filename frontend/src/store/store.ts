import { AUTH_SLICE_KEY, type AuthAction, type AuthState, initialState } from "./reducers/authSlice";
import authReducer from "./reducers/authSlice";

export interface RootState {
  [AUTH_SLICE_KEY]: AuthState;
}

type Listener = () => void;

const createStore = () => {
  let state: RootState = {
    [AUTH_SLICE_KEY]: initialState,
  };

  const listeners = new Set<Listener>();

  return {
    dispatch(action: AuthAction) {
      state = {
        [AUTH_SLICE_KEY]: authReducer(state[AUTH_SLICE_KEY], action),
      };
      listeners.forEach((listener) => listener());
      return action;
    },
    getState() {
      return state;
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    replaceReducer() {
      // Not implemented
    },
    [Symbol.observable]() {
      return {
        subscribe: (observer: any) => {
          const listener = () => observer.next(this.getState());
          this.subscribe(listener);
          return { unsubscribe: () => this.subscribe(listener) };
        },
      };
    },
  };
};

export const store = createStore();

export const persistor = {
  async purge() {
    try {
      localStorage.removeItem(AUTH_SLICE_KEY);
    } catch {
      // ignore storage failures
    }
  },
};

export type AppDispatch = typeof store.dispatch;
