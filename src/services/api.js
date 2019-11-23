import Axios from 'axios';

import session from './session';

const user = session.load('user');

const api = Axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {'Authorization': 'bearer ' + (user && user.token ? user.token : '')}
});

export default api;