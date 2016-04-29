var React = require('react');
var ReactDOM = require('react-dom');
var actions = require('./../actions/GroceryItemActionCreator.jsx');

module.exports = React.createClass({
    delete: function(e) {
        e.preventDefault();
        actions.delete(this.props.item);
    },
    togglePurchased: function(e) {
        e.preventDefault();
        if(this.props.item.purchased) {
            actions.unbuy(this.props.item);
        } else {
            actions.buy(this.props.item);
        }
    },
    render: function() {
        return (
           <div className="grocery-item row">
				<div className="six columns">
					<h4 className={this.props.item.purchased ? "strikethrough" : "" }>
						{this.props.item.name}
					</h4>
				</div>
				<form onSubmit={this.togglePurchased} className="three columns">
					<button className={this.props.item.purchased ? "" : "button-primary"}>{this.props.item.purchased ? "unbuy" : "buy"}</button>
				</form>
				<form className="three columns" onSubmit={this.delete}>
					<button>&times;</button>
				</form>
			</div>
        )
    }
})