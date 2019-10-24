import axios from 'axios';

// Insert your own API key after Token
export default() => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token c3121365839fda19486243304dd555da3b81a6d2`
        }
    });
};