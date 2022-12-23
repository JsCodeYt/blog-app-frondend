export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_START": {
      return {
        ...state,
        loading: true,
      };
    }
    case "USER_OK": {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    }
    case "USER_ERROR": {
      return {
        ...state,
        error: true,
      };
    }
    default: {
      return { ...state };
    }
  }
};
