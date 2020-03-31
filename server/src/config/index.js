require('dotenv').config();
export default Object.freeze({
    port: process.env.PORT,
    secret: process.env.SECRET,
    mongoUrl: process.env.MONGO_URL 
});