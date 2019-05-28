import axios from 'axios';

// axios.defaults.baseURL = 'https://face-verification-test.herokuapp.com/api';
// axios.defaults.baseURL = 'http://192.168.100.35:3000/api';
// axios.defaults.baseURL = 'https://rutapp.mx:4543';

const rutapp = axios.create({
  baseURL: 'https://rutapp.mx:4543',
  headers: {
    'content-type': 'multipart/form-data',
  },
});

const heroku = axios.create({
  baseURL: 'https://rutapp.mx:3006/api',
});

/* const heroku = axios.create({
  baseURL: 'https://facematch-api.herokuapp.com/api',
}); */

export default ({ Vue }) => {
  Vue.prototype.$rutapp = rutapp;
  Vue.prototype.$heroku = heroku;
};
