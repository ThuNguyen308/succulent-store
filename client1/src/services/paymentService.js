import axios from "axios"

export const getConfig = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}api/v1/payment/config`)
    return res
}