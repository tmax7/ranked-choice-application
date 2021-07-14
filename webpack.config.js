var path = require('path');

module.exports = {
    entry: {
        candidatePage: './src/main/js/candidatePage.js',
        createSimulationPage: './src/main/js/createSimulationPage.js'
    },
    devtool: 'eval-cheap-module-source-map',
    watch: true,
    cache: true,
    mode: 'development',
    output: {
        path: __dirname + '/src/main/resources/static/built',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};