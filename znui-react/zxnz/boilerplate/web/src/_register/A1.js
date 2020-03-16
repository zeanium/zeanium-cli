var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'A1',
	render: function(){
		return (
			<div style={{backgroundColor: 'blue'}} >
				<div>A1</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Params: {JSON.stringify(this.props.params)}</div>
				<div>Unmatchs: {JSON.stringify(this.props.request.unmatchs)}</div>
			</div>
		);
	}
});