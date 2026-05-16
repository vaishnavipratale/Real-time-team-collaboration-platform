export type PermissionMatrix = Record<string, unknown>;

export interface User {
  id?: string | number;
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
  warehouse_is_active?: boolean;
  address_status?: boolean;
  bank_status?: boolean;
  [key: string]: unknown;
}

export interface AuthState {
  user: User | null;
  permissions: PermissionMatrix | null;
  isAuthenticated: boolean;
}

export const AUTH_SLICE_KEY = "customer_web_auth";

const getStoredState = (): AuthState | null => {
  try {
    const raw = localStorage.getItem(AUTH_SLICE_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
};

export const initialState: AuthState =
  getStoredState() || {
    user: null,
    permissions: null,
    isAuthenticated: false,
  };

const persistState = (state: AuthState) => {
  try {
    localStorage.setItem(AUTH_SLICE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures
  }
};

const LOGIN = `${AUTH_SLICE_KEY}/login`;
const LOGOUT = `${AUTH_SLICE_KEY}/logout`;
const SET_PERMISSIONS = `${AUTH_SLICE_KEY}/setPermissions`;

export const login = (payload: { user: User }) =>
  ({
    type: LOGIN,
    payload,
  }) as const;

export const logout = () =>
  ({
    type: LOGOUT,
  }) as const;

export const setPermissions = (payload: { permissions: PermissionMatrix }) =>
  ({
    type: SET_PERMISSIONS,
    payload,
  }) as const;

export type AuthAction =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setPermissions>;

export default function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case LOGIN: {
      const nextState = {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
      persistState(nextState);
      return nextState;
    }
    case SET_PERMISSIONS: {
      const nextState = {
        ...state,
        permissions: action.payload.permissions,
      };
      persistState(nextState);
      return nextState;
    }
    case LOGOUT: {
      const nextState = {
        user: null,
        permissions: null,
        isAuthenticated: false,
      };
      persistState(nextState);
      return nextState;
    }
    default:
      return state;
  }
}
