require('@zeanium/core');
var path = require('path');
var argv = zn.convertArrayArgv(process.argv).argv;
var _path = argv['znui-react.path'] || '';
module.exports = require(_path + 'znui-react/webpack').zxnz.development(function (config) {

    var _page = argv['page'] || [];
    if(zn.is(_page, 'string')) {
        _page = [ _page ];
    }
    _openPage = argv['openPage'] || (_page[0] + '.html');
    if(_openPage) {
        return {
            devServer: {
                compress: true,
                contentBase: path.resolve(__dirname, "../www/"),
                disableHostCheck: true,
                hot: true,
                https: false,
                open: 'Google Chrome',
                openPage: _openPage,
                port: argv['port'] || 9000,
                historyApiFallback: {
                    disableDotRule: true,
                    index: _page,
                    rewrites: [
                        {
                            from: /\.hot-update\.json$/,
                            to: function (context) {
                                return '/' + path.basename(context.parsedUrl.pathname);
                            }
                        }, 
                        {
                            from: /\.hot-update\.js$/,
                            to: function (context) {
                                return '/' + path.basename(context.parsedUrl.pathname);
                            }
                        }
                    ]
                }
            }
        };
    }

    return {};
});