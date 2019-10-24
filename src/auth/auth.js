import axios from 'axios';

// Insert your own API key after Token
// Nguyen API: df3a9ea1d4d5804d830fe93267242281cedd59ec
// Aaron API: c3121365839fda19486243304dd555da3b81a6d2
// Lidiia API: 636d48a60803e8f600139e8a47d731a28141474b

export default() => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token df3a9ea1d4d5804d830fe93267242281cedd59ec`
        }
    });
};