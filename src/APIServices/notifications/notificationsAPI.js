import axios from 'axios';

const BASE_URL = 'https://blog-nest-backend-production.up.railway.app/api/v1/notifications';

//Fetch all notifications
export const fetchNotificationsAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Read notification
export const readNotificationAPI = async (notificationId) => {
    try {
        const posts = await axios.put(`${BASE_URL}/${notificationId}`,{});

        return posts.data;
    } catch (err) {
        console.log(err);
    }
}