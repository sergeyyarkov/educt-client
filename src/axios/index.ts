import axios from 'axios';
import { API_BASE_URL } from '../constants';

/**
 * Create axios config
 */
export default axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
});
