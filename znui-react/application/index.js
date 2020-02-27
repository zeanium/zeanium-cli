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
    bundle: function (argv){
        
    },
    generateHtml: function (argv){
        var _mode = argv.mode || process.env.NODE_ENV || 'production',
            _cwd = process.cwd();
        if(node_fs.existsSync(node_path.resolve(_cwd, './__webpack__/', _mode + '.html'))){
            var _package = require(node_path.resolve(_cwd, './package.json'));
            var _data = argv.data || './__webpack__/' + _mode + '.json';
            if(!node_fs.existsSync(node_path.resolve(_cwd, _data))){
                throw new Error('data is not exist.');
            }
            _data = require(node_path.resolve(_cwd, _data));
            _data = zn.deepExtend({
                name: _package.name,
                keywords: _package.keywords.join(','),
                description: _package.description
            }, _data, argv);
            var _template = node_fs.readFileSync(node_path.resolve(_cwd, './__webpack__/', _mode + '.html'), 'utf8');
            var _str = zn.json.format(_data, _template);
            node_fs.writeFileSync(node_path.resolve(_cwd, './www/' + _data.name + ".html"), _str);
        }
    }
};