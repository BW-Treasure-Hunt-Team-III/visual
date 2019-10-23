import axios from 'axios';

// Insert your own API key after Token
export default() => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token 636d48a60803e8f600139e8a47d731a28141474b`
        }
    });
};