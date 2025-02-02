const config = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://zayka-express-evl9.vercel.app'
    : 'http://localhost:5000'
};

export default config;