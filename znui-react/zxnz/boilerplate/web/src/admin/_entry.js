require("znui-react");
znui.react.createApplication({
	components: {
		_register: require('../_register/_entry'),
		router: require("znui-react-router"),
	},
    render: {
		component: 'zr.router.HashRouter',
		components: [],
		main: '/',
		routes: {
			'/': require('./A1.js')
		}
	}
});