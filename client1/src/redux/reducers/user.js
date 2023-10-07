const initState = {
    user: {
        email: '',
        name: '',
        avartar: '',
        role: ''
    },
    isLoading: false,
    isError: false,
    isAuth: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
            ...state,
            isLoading: true,
            isError: false,
            isAuth: false
        };
      case "LOGIN_SUCCESS":
        return {
            ...state,
            user: action.payload,
            isLoading: false,
            isError: false,
            isAuth: true
        };
      case "LOGIN_ERROR":
        return {
            ...state,
            isLoading: false,
            isError: true,
            isAuth: false
        };
      case "UPDATE":
        return {
            ...state,
            user: action.payload
        }
    case "LOGOUT":
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return {
            ...state,
            user: {},
            isAuth: false
        }
      default:
        return state;
    }
  };

export default userReducer