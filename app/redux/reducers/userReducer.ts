 
const getCookie=(name:any)=> {
  if (typeof document !== "undefined") {
  let nameEQ = name + "=";
  let cookies = document?.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}
return null;
}
 
const initialState = {
  role: getCookie("role") || "",
};

const UPDATE_ROLE = "UPDATE_ROLE";

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_ROLE:
      const role = action.payload;
      return {
        ...state,
        role: role,
      };
    default:
      return state;
  }
};
