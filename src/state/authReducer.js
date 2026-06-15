export const initialAuthState = {
  users: [],
  currentUser: null,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOAD_AUTH_STATE":
      return {
        ...state,
        users: action.payload.users,
        currentUser: action.payload.currentUser,
      };
    case "REGISTER":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: null };
    default:
      return state;
  }
}
