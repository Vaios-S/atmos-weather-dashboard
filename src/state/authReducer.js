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
    case "ADD_FAVORITES":
      const updatedUsers = state.users.map((user) => {
        if (user.id === state.currentUser.id) {
          return {
            ...user,
            favorites: [...user.favorites, action.payload],
          };
        }

        return user;
      });

      return {
        ...state,
        users: updatedUsers,
      };
    case "REMOVE_FAVORITES":
      const updatedUsers2 = state.users.map((user) => {
        if (user.id === state.currentUser.id) {
          return {
            ...user,
            favorites: user.favorites.filter((city) => city !== action.payload),
          };
        }

        return user;
      });

      return {
        ...state,
        users: updatedUsers2,
      };
    case "ADD_RECENT_SEARCH":
      const updatedUsers3 = state.users.map((user) => {
        if (user.id === state.currentUser.id) {
          for (let i = 0; i < user.recentSearches.length; i++) {
            if (user.recentSearches[i] === action.payload) {
              return {
                ...user,
                recentSearches: [...user.recentSearches],
              };
            }
          }
          return {
            ...user,
            recentSearches: [...user.recentSearches, action.payload],
          };
        }

        return user;
      });

      return {
        ...state,
        users: updatedUsers3,
      };
    case "REMOVE_RECENT_SEARCH":
      const updatedUsers4 = state.users.map((user) => {
        if (user.id === state.currentUser.id) {
          return {
            ...user,
            recentSearches: [],
          };
        }

        return user;
      });

      return {
        ...state,
        users: updatedUsers4,
      };
    default:
      return state;
  }
}
