import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data)
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`
    const data = {
        _id: _id,
    }
    return axios.delete(URL_BACKEND)
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`
    const formData = new FormData();
    formData.append('fileImg', file)
    const config = {
        headers: {
            'upload-type': folder,
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(URL_BACKEND, formData, config)
}

const handleUpdateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone,
        avatar: avatar
    }
    return axios.put(URL_BACKEND, data)
}

const registerUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user/register"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data)
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login"
    const data = {
        username: email,
        password: password,
        // delay: 5000
    }
    return axios.post(URL_BACKEND, data)
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account"
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout"
    return axios.post(URL_BACKEND);
}

const getAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = {
        thumbnail: "abc.png",
        mainText: mainText,
        author: author,
        price: +price,
        quantity: +quantity,
        category
    }
    return axios.post(URL_BACKEND, data)
}

const updateBookAPI = (_id, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = {
        _id,
        mainText: mainText,
        author: author,
        price: +price,
        quantity: +quantity,
        category
    }
    return axios.put(URL_BACKEND, data)
}

const handleUpdateThumnailAPI = (_id, thumbnail) => {
    const URL_BACKEND = "/api/v1/book"
    const data = {
        _id,
        thumbnail
    }
    return axios.put(URL_BACKEND, data)
}

const deleteBookAPI = (_id) => {
    const URL_BACKEND = `/api/v1/book/${_id}`
    return axios.delete(URL_BACKEND);
}
export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI,
    handleUploadFile, handleUpdateUserAvatarAPI, registerUserAPI, loginAPI, getAccountAPI, logoutAPI,
    getAllBookAPI, createBookAPI, updateBookAPI, handleUpdateThumnailAPI, deleteBookAPI
}