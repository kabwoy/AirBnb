import axios from 'axios'

const REGISTER_URL = 'http://localhost:5005/user/auth/register/'
const LOGIN_URL = 'http://localhost:5005/user/auth/login/'

//register user
const userRegistration = async (userData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': ' '
        }
    }

    try {
        const response = await axios.post(REGISTER_URL, userData, config);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        //throw new Error(error.response?.data?.message || 'Registration failed');
    }
}

//user login
const userLogin = async (userData) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const response = await axios.post(LOGIN_URL, userData, config)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
}

//logout user
const logout = () => localStorage.removeItem('user')


const authService = { userRegistration, userLogin, logout};
export default authService;