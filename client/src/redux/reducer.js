const initialData = {
  bikes: [],
};

export const reducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case "GET_ALL_BIKES": {
      return {
        ...state,
        bikes: payload,
      };
    }
    default:
      return state;
  }
};
