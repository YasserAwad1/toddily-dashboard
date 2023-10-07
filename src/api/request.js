import axios from 'axios'
import Cookies from 'js-cookie'
const client = axios.create({ baseURL: 'https://api.toddily-pre.com/api' })
export const request = async ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer ${Cookies.get('_toddily_admin_token')}`
    return client(options)
        .then((res) => res)
}

export const baseURLImage = 'https://api.toddily-pre.com'
