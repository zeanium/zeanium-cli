
require('znui-react');
require('../src/index.less');
require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var components = require('../src/index.js');
ReactDOM.render(
    <div className="example-container">
        {
            Object.keys(components).map(function (key, index){
                var _Component = components[key];
                return <_Component key={index} />
            })
        }
    </div>,
    document.getElementById('container'),
);

