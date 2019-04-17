import axios from 'axios';

axios.defaults.baseURL = 'https://face-verification-test.herokuapp.com/api';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
