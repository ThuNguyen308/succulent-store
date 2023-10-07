import axios from "./customize-axios"

const fetchAllProduct = (page, limit) => {
    return axios.post(`api/v1/product/get-paginated-products/${page}/${limit}`)
}

export { fetchAllProduct }