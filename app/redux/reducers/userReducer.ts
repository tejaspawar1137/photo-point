const initialState = {
  authtoken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NThjODc0MjBlYjc5NzM5MTk1M2QzMSIsImlhdCI6MTcwMTAxMDczMX0.Vvb1vFls9XdUpwhlVJI3v82jIHCojfLQ_iZ_uO9o_Tk",
};

const UPDATE_AUTHTOKEN = "UPDATE_AUTHTOKEN";

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_AUTHTOKEN:
      const authtoken = action.payload;
      return {
        ...state,
        authtoken: authtoken,
      };
    default:
      return state;
  }
};
