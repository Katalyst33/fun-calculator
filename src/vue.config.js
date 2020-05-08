const env = process.env;
const path = require('path');
// const url = env.APP_PROTOCOL;
module.exports = {

    devServer: {
        proxy: {
            '/api': {
                target: env.VUE_APP_BACKEND_URL,
            },
        }
    }
};



console.log(__dirname);
