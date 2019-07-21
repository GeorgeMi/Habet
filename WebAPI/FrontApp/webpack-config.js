module.exports = {
    devtool: 'source-map',
    entry: "./app.tsx",
    mode: "development",
    output: {
        filename: "./app-bundle.js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    externals: {
       'config': JSON.stringify({ API_Path: "http://localhost:65315/api" }) 
       // 'config': JSON.stringify({ API_Path: "http://api.gabrielhabet.co.uk/api" }) 
        }
}