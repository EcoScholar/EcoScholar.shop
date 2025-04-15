// Base URL for API calls
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-1-iota.vercel.app/'
  : 'http://localhost:5000';

const getBaseUrl = () => {
    // Remove any trailing slash to prevent double slashes in API calls
    const url = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    console.log('Using base URL:', url);
    return url;
}

export { baseURL };
export default getBaseUrl;
