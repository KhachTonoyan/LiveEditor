const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
    mode:'production',
    entry:'./src/script.js',
    output:{
        filename:'[contenthash].js',
        path: path.resolve(__dirname,"public")
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:'./src/index.html',
            scriptLoading:"defer" 
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
          {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
          {
            test:/\.css$/,
            use:['style-loader','css-loader']
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread',
                "@babel/plugin-proposal-class-properties"]
              }
            }
          }
        ]
      }
}