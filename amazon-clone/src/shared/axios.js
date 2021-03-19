import axios from "axios";

const instance = axios.create({
    baseURL: 'https://amazon-clone-react-sayan3sarka.herokuapp.com'
    // 'http://localhost:5001/clone-e0a97/us-central1/api'
});

export default instance;