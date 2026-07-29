import { authReducer, initialAuthState } from "../state/authReducer";

describe("authReducer", () => {
  test("should load auth state", () => {
    const payload = {
      users: [
        {
          id: 1,
          username: "john",
          favorites: [],
          recentSearches: [],
        },
      ],
      currentUser: {
        id: 1,
        username: "john",
      },
    };

    const newState = authReducer(initialAuthState, {
      type: "LOAD_AUTH_STATE",
      payload,
    });

    expect(newState.users).toEqual(payload.users);
    expect(newState.currentUser).toEqual(payload.currentUser);
  });

  test("should register a new user", () => {
    const newUser = {
      id: 1,
      username: "john",
      favorites: [],
      recentSearches: [],
    };

    const newState = authReducer(initialAuthState, {
      type: "REGISTER",
      payload: newUser,
    });

    expect(newState.users).toEqual([newUser]);
  });

  test("should login a user", () => {
    const user = {
      id: 1,
      username: "john",
      favorites: [],
      recentSearches: [],
    };

    const newState = authReducer(initialAuthState, {
      type: "LOGIN",
      payload: user,
    });

    expect(newState.currentUser).toEqual(user);
  });

  test("should logout the current user", () => {
    const state = {
      ...initialAuthState,
      currentUser: {
        id: 1,
        username: "john",
        favorites: [],
        recentSearches: [],
      },
    };

    const newState = authReducer(state, {
      type: "LOGOUT",
    });

    expect(newState.currentUser).toBe(null);
  });

  test("should add a city to favorites", () => {
    const user = {
      id: 1,
      username: "john",
      favorites: [],
      recentSearches: [],
    };

    const state = {
      users: [user],
      currentUser: user,
    };

    const newState = authReducer(state, {
      type: "ADD_FAVORITES",
      payload: "Athens",
    });

    expect(newState.users[0].favorites).toEqual(["Athens"]);
  });
});
