var path = require('path'),
    base = require('./base'),
    argv = process.argv,
    __parseArgv__ = function (argv){
        var _env = [],
            _keys = {},
            _key = '',
            _value = null,
            _counter = {},
            _started = false;
        for(var i = 0, _len = argv.length; i < _len; i++){
            _value = argv[i];
            if(_value.indexOf('--') !== -1){
                _key = _value.replace('--', '');
                _keys[_key] = true;
                _counter[i+1] = _key;
                if(!_started) {
                    _started = true;
                }
            }else{
                if(_started){
                    if(_counter[i]) {
                        _keys[_counter[i]] = _value;
                    }else{
                        var _i = i - 1;
                        while (!_counter[_i] && _i > 0) {
                            _i = _i - 1;
                        }
                        if(_counter[_i]){
                            var _keyValue = _keys[_counter[_i]];
                            if(_keyValue != null){
                                if(typeof _keyValue === 'string'){
                                    _keys[_counter[_i]] = [_keyValue, _value];
                                } else if(typeof _keyValue === 'object'){
                                    _keys[_counter[_i]].push(_value);
                                }
                            }else {
                                _keys[_counter[_i]] = _value;
                            }
                        }
                    }
                }else {
                    _env.push(_value);
                }
            }
        }

        return {
            env: _env,
            argv: _keys
        };
    },
    _argv = __parseArgv__(argv);

if(_argv.argv.zn_path){
    require(path.resolve(process.cwd(), _argv.argv.zn_path));
}else {
    require('@zeanium/core');
}

_argv.do = function (modules){
    var _env = _argv.env,
        _module = _env[2],
        _method = _env[3];
    if(!_module) {
        throw new Error('Module is required.');
    }
    if(!modules[_module]) {
        throw new Error('Module "' + _module +'" is not exist.');
    }
    zn.extend(modules[_module], base);

    if(!modules[_module][_method]) {
        throw new Error('The method(' + _method +') of module ' + _module + ' is not exist.');
    }

    modules[_module][_method].call(modules[_module], _argv.argv, _argv.env);
}

module.exports = _argv;