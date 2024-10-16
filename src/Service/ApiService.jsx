import CryptoJS from 'crypto-js';

const BASE_URL = "http://localhost:5001";
const Header = {
    "Content-Type": "application/json",
    "api-key": "656469736f6e7072696e6365626c6f67676572776562736974656973746f637265617465736f6d65626c6f677061676573",
}
const secretKey = 'TxlJ9V2/6KO5kKsY5gYsOxMXC2ljhRgnGbvIFVNWQ219Ud7V2eVpTl3UM9Ozw3fiT612LJAHt6+npA+GnS/7RQ==';

const encryptData = (data, secretKey) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const RegisterUser = async (datas) => {
    try {
        const data = encryptData(datas, secretKey);
        console.log(data);

        const response = await fetch(`${BASE_URL}/RegisterUser`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ data: data })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Register failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};


export const loginUser = async (email, password) => {
    try {

        const response = await fetch(`${BASE_URL}/LoginValidation`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const GetPosts = async (id) => {
    try {
        const encryptedId = encryptData(id, secretKey);
        console.log(encryptedId);
        const response = await fetch(`${BASE_URL}/GetPosts`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ encryptedId })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Post Retrieve failed');
        }

        return await response.json();
    } catch (error) {
        console.error("No Post Found Error:", error);
        throw error;
    }
};


export const DeletePost = async (dataId) => {
    try {
        const id = encryptData(dataId, secretKey)
        const response = await fetch(`${BASE_URL}/DeletePost`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Post Delete failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Post Delete Error:", error);
        throw error;
    }
};


export const UpdateProfile = async (datas) => {
    try {
        const data = encryptData(datas, secretKey)

        const response = await fetch(`${BASE_URL}/UpdateProfile`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Profile Update failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Profile Update Error:", error);
        throw error;
    }
};



export const GetBlogPosts = async (dataId, currentPage, postsPerPage) => {
    try {
        const data = encryptData(dataId, secretKey);

        const body = JSON.stringify({
            data,
            currentPage,
            postsPerPage
        });

        const response = await fetch(`${BASE_URL}/GetBlogPosts`, {
            method: 'POST',
            headers: Header,
            body: body
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Post Retrieve failed');
        }

        return await response.json();
    } catch (error) {
        console.error("No Post Found Error:", error);
        throw error;
    }
};


export const GetBlogPostView = async (datas) => {
    try {
        const data = encryptData(datas, secretKey);

        const response = await fetch(`${BASE_URL}/GetBlogPostView`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Post Retrieve failed');
        }

        return await response.json();
    } catch (error) {
        console.error("No Post Found Error:", error);
        throw error;
    }
};



export const CreatePost = async (datas) => {
    try {
        const data = encryptData(datas, secretKey)

        const response = await fetch(`${BASE_URL}/CreateOrUpdatePost`, {
            method: 'POST',
            headers: Header,
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Post Retrieve failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Post Create Error:", error);
        throw error;
    }
};

