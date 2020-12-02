import axios from 'axios';
import * as faceapi from './face-api-min.js';


const url = 'http://localhost:5000/snaps';

export const fetchData = () => axios.get(url);


