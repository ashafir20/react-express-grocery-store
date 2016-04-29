var GroceryItemList = require('./components/GroceryItemList.jsx');
var React = require('react');
var ReactDOM = require('react-dom');

var groceryItemStore = require('./stores/GroceryItemStore.jsx');
var initial = groceryItemStore.getItems();

function render() {
    ReactDOM.render(<GroceryItemList items={initial}/>, document.getElementById('app'));
}

groceryItemStore.onChange(function(items){
    initial = items;
    render();
})


render();