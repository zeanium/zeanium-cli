var FileUtil = require('../../__/FileUtil');
var node_path = require('path');
var node_fs = require('fs');

module.exports = {
    init: function (argv){
        var _source = node_path.resolve(__dirname, './boilerplate'),
            _target = node_path.resolve(process.cwd(), argv.path || ''),
            _package = require(node_path.resolve(_source, 'package.json'));
        
        if(node_fs.existsSync(node_path.resolve(_target, 'package.json'))){
            _package = zn.deepAssign(require(node_path.resolve(_target, 'package.json')), {
                scripts: _package.scripts,
                dependencies: _package.dependencies,
                devDependencies: _package.devDependencies
            });
        } else {
            _package.key = argv.name;
            _package.name = "znui-react-" + argv.name;
            _package.version = argv.version || "1.0.1";
            _package.keywords.push(argv.name);
            if(argv.repository){
                _package.repository = {
                    type: "git",
                    url: argv.repository
                }
            }
        };

        FileUtil.copyFolder(_source, _target, {
            callback: function (dirent, tfile){
                if(process.env.NODE_ENV == "development") {
                    console.log("Created: ", tfile);
                }
            }
        });

        FileUtil.createFile(node_path.resolve(_target, 'package.json'), JSON.stringify(_package, null, 2));
    }
};