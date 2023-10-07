export const addToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product,
    };
};

export const updateQuantity = (product) => {
    return {
        type: "UPDATE_QUANTITY",
        payload: product
    }
}

export const removeFromCart = (productId) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: productId,
    };
};

export const removeAll = () => {
    return {
        type: "REMOVE_ALL",
    }
}