// Base URL for API calls
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://ecoscholar.onrender.com'
  : 'http://localhost:5000';

const getBaseUrl = () => {
    console.log('Using base URL:', baseURL);
    return baseURL;
}

export { baseURL };
export default getBaseUrl;