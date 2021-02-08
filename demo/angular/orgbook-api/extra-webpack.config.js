const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                ORGBOOK_HOST: JSON.stringify(process.env.ORGBOOK_HOST)
            }
        })
    ]
};