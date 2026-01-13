import axios from "axios"

export const getData = async () => {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products')
    return response.data;
}