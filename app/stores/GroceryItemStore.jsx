var dispatcher = require('./../dispatcher.js');

//only the store may change the data inside the store
//only getters no setters
//the store 'listens' for events in the system and when a relevant action recived
//it catches the payload and triggers the listeners callbacks with the payload
//the idea is that other components should not temper with what is going on inside the store
function GroceryItemStore () {
    var items = [
        {
            name: "Banana",
            purchased: true,
        },
        {
            name: 'Yugurt'
        },
        {
            name: 'Cornflakes'
        }];
    var listeners = [];
    
    function getItems() {
        return items;
    }
    
    function onChange(listener) {
        listeners.push(listener);
    }
    
    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();
    }
    
    function deleteGroceryItem(item) {
        var index;
        items.filter(function(_item, _index){
            if(_item.name === item.name){
                index = _index;
            }
        });
        
        items.splice(index, 1);
        triggerListeners();
    }
    
    function triggerListeners() {
        listeners.forEach(function(listener){
           listener(items); 
        });
    }
    
    function setGroceryItemBought(item, isBought) {
        var _item = items.filter(function(a) {return a.name === item.name})[0];
        _item.purchased = isBought || false;
        triggerListeners();
    }
    
    dispatcher.register(function(event){
        var split = event.type.split(':');
        if(split[0] === 'grocery-item'){
            switch(split[1]){
                case 'add': 
                    addGroceryItem(event.payload);
                    break;
                case 'delete': 
                    deleteGroceryItem(event.payload);
                    break;
                case 'buy': 
                    setGroceryItemBought(event.payload, true);
                    break;
                case 'unbuy': 
                    setGroceryItemBought(event.payload, false);
                    break;
            }
        }
    });
    
    return {
        getItems: getItems,
        onChange: onChange
    }
}

module.exports = new GroceryItemStore();