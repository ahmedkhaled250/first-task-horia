import axios from "axios";
import { createContext, useState } from "react";
import avatarPhoto from "../assets/avtar/avatar.png"
export const UserContext = createContext()
function UserContextProvider(props) {
    const [token, setToken] = useState(localStorage.getItem("Token"))
    const [userData, setUserData] = useState({});
    // https://manawlaapi.mubasher.com.eg
    const [baseUrl, setBaseUrl] = useState("http://localhost:5000");
    const [avatar, setAvatar] = useState(avatarPhoto);
    const profile = async () => {
        return axios.get(`${baseUrl}/user/profile`, {
            headers: { authorization: `Hamada__${token}` }
        }).then(data => data).catch(err => err)
    }

    const addToWishList = async (id) => {
        return axios.patch(`${baseUrl}/product/${id}/wishList/add`, {}, {
            headers: { authorization: `Hamada__${token}` }
        }).then(data => data).catch(err => err)
    }

    const removeFromWishList = async (id) => {
        return axios.patch(`${baseUrl}/product/${id}/wishList/remove`, {}, {
            headers: { authorization: `Hamada__${token}` }
        }).then(data => data).catch(err => err)
    }

    return (
        <UserContext.Provider value={{ token, userData, baseUrl, addToWishList, removeFromWishList, setUserData, setToken, avatar, profile }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
