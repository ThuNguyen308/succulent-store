export const login = () => {
    return {
        type: "LOGIN"
    };
};

export const loginSuccess = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: user,
    };
};

export const loginError = () => {
    return {
        type: "LOGIN_ERROR"
    };
};

export const update = (user) => {
    return {
        type: "UPDATE",
        payload: user,
    };
};

export const logout = () => {
    return {
        type: "LOGOUT",
    }
}