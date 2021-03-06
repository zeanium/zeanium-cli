var FileUtil = require('../../__/FileUtil');
var node_path = require('path');
var node_fs = require('fs');
var node_child_process = require('child_process');
var _dirname = __dirname,
    _cwd = process.cwd();

module.exports = {
    init: function (argv){
        var _source = node_path.resolve(_dirname, '../application/boilerplate'),
            _target = node_path.resolve(_cwd, argv.path || ''),
            _package = require(node_path.resolve(_source, 'package.json'));
        
        _package.name = argv.name;
        _package.version = argv.version || "1.0.1";
        _package.keywords.push(argv.name);
        if(argv.repository){
            _package.repository = {
                type: "git",
                url: argv.repository
            }
        }

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
            var _path = node_path.resolve(process.cwd(), argv.zxnz_path, 'Launcher.js');
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
    stop: function (argv, env, callback){
        var _config = require(node_path.resolve(process.cwd(), argv.config || './zn.server.config.js'));
        if(_config.port){
            var _lsof = node_child_process.spawn('lsof', ['-i4TCP:' + _config.port]);
            _lsof.stdout.on('data', (data) => {
                var _data = data.toString('utf8'),
                    _items = _data.split('\n');
                for(var i = 1, _len = _items.length; i < _len; i++){
                    if(_items[i].indexOf('node') == 0){
                        zn.info('Closing: ', _items[i]);
                        node_child_process.spawnSync('kill', ['-9', _items[i].split(' ')[4]]);
                    }
                }
                callback && callback();
            });
              
            _lsof.stderr.on('data', (err) => {
                zn.error(`Error: ${err}`);
            });

            _lsof.on('close', (code) => {
                callback && callback();
                zn.info('Finished: ', code);
            });
        }
    },
    restart: function (argv, env){
        this.stop(argv, env);
        this.start(argv, env);
    },
    build: function (argv){
        
    },
    dockerfile: function (){

    },
    drone: function (){

    }
};