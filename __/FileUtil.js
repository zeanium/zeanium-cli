var node_path = require('path');
var node_fs = require('fs');

module.exports = {
    createFile: function (path, data, options) {
        var _options = zn.deepAssign({ forcerm: false }, options);
        if(_options.forcerm && node_fs.existsSync(path)){
            node_fs.unlinkSync(path);
        }
        node_fs.writeFileSync(path, data, options);
    },
    copyFile: function (source, target, flags) {
        node_fs.copyFileSync(source, target, flags || node_fs.constants.COPYFILE_FICLONE);
    },
    copyFolder: function (source, target, options) {
        var _options = zn.deepAssign({ forcerm: true }, options),
            _forcerm = _options.forcerm,
            _dir = node_fs.readdirSync(source, {
                withFileTypes: true
            });

        _dir.forEach(function (dirent, index){
            var _sfile = node_path.resolve(source, dirent.name),
                _tfile = node_path.resolve(target, dirent.name),
                _tExist = node_fs.existsSync(_tfile);
            
            if(!_forcerm && _tExist){
                return false;
            }

            if(dirent.isDirectory()){
                if(!_tExist) {
                    node_fs.mkdirSync(_tfile);
                }
                this.copyFolder(_sfile, _tfile, _options);
            }else if(dirent.isFile()){
                if(_forcerm && _tExist) {
                    node_fs.chmodSync(_tfile, 0o777);
                    node_fs.unlinkSync(_tfile);
                }
                this.copyFile(_sfile, _tfile);
                _options.callback && _options.callback(dirent, _tfile);
            }

            
        }.bind(this));
    },
    unlinkFile: function (path){
        node_fs.chmodSync(path, 0o777);
        node_fs.unlinkSync(path);
    },
    unlinkFolder: function (path, callback){
        var _dir = node_fs.readdirSync(path, { withFileTypes: true });
        _dir.forEach(function (dirent, index){
            var _path = node_path.resolve(path, dirent.name);
            if(dirent.isDirectory()){
                this.unlinkFolder(_path, callback);
                node_fs.rmdirSync(_path);
            }else if(dirent.isFile()){
                this.unlinkFile(_path);
            }

            callback && callback(dirent);
        }.bind(this));
    }
};