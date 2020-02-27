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
                dependencies: _package.dependencies,
                scripts: _package.scripts
            });
        } else {
            _package.name = argv.name;
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
    },
    start: function (argv, env){
        var ZXNZLauncher = null;
        if(argv.zxnz_path) {
            var _path = node_path.resolve(process.cwd(), argv.zxnz_path);
            if(node_fs.existsSync(_path)) {
                ZXNZLauncher = require(_path);
            }
        }else{
            ZXNZLauncher = require('zxnz/Launcher.js');
        }
        if(ZXNZLauncher){
            return ZXNZLauncher.start(env, argv);
        }else{
            throw new Error('zxnz is not exist.')
        }
    },
    stop: function (argv, env){
        
    },
    controller: function (argv){
        var _temp = `module.exports = zn.Controller('${argv.name.toLowerCase()}', {
            validate: true,
            methods: {
                test: {
                    route: 'test',
                    validate: false,
                    method: 'GET/POST',
                    value: function (request, response){
                        response.success('test.');
                    }
                }
            }
        });`;
        var _config = require(node_path.resolve(process.cwd(), './zn.app.config.js'));
        FileUtil.createFile(node_path.resolve(process.cwd(), _config.models, argv.name + '.js'), _temp);
    },
    model: function (argv){
        var _temp = `module.exports = zxnz.Model("${argv.name.toLowerCase()}", {
            mixins: [
                zxnz.ref.Base
            ],
            properties: {
                
            }
        });`;
        var _config = require(node_path.resolve(process.cwd(), './zn.app.config.js'));
        FileUtil.createFile(node_path.resolve(process.cwd(), _config.models, argv.name + '.js'), _temp);
    }
};