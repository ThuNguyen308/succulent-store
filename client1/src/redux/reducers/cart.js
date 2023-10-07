const initState = {
    items: JSON.parse(localStorage.getItem("cart")) ?? [],
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let isExisting = false
            const newItems = [...state.items].map(item => {
                if(item._id === action.payload._id) {
                    isExisting = true
                    item.buyQuantity =  action.payload.buyQuantity + 1
                }
                return item
            })
            if(!isExisting) {
                action.payload.buyQuantity = 1
                newItems.push(action.payload)
            }
            localStorage.setItem('cart', JSON.stringify(newItems))
            return {
                items: newItems
            }
        }
        case "UPDATE_QUANTITY": {
            const newItems = [...state.items].map(item => {
                if(item._id === action.payload._id) {
                    item.buyQuantity =  action.payload.buyQuantity
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(newItems))
            return {
                items: newItems
            }
        }
        case "REMOVE_FROM_CART": {
            const newItems = [...state.items].filter(item => item._id !== action.payload._id)
            localStorage.setItem('cart', JSON.stringify(newItems))
            return {
                items: newItems
            }
        }
        case "REMOVE_ALL": {
            localStorage.setItem('cart', JSON.stringify([]))
            return {
                items: []
            }
        }
        default:
            return state;
    }
}

export default cartReducer