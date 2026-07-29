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
});
