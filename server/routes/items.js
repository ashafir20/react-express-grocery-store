module.exports = function (app) { 
        
    var GroceryItem = require("./../models/GroceryItem.js");
        
    app.get('/api/items', function(req, res) {
        GroceryItem.find(function(err, docs){
            res.send(docs);
        });
    });
    
    app.post('/api/items', function(req, res) {
        new GroceryItem(req.body).save(function(err, data){
            res.status(300).send();
        });
    });
    
    app.route('/api/items/:id')
    .delete(function(req,res){
        console.log("removing...",req.params.id);
        GroceryItem.findOne({
            _id:req.params.id
        }).remove(function(x){
            console.log("removed.",x);
        });
    })
    .patch(function(req,res){
        GroceryItem.findOne({
            _id:req.body._id
        },function(error,doc){
            console.log(error);
            for (var key in req.body){
                doc[key] = req.body[key];
            }
            doc.save();
            res.status(200).send();
        })
    })
}

