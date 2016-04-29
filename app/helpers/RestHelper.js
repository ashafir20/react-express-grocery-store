var $ = require('jquery');

module.exports = {
    get: function(url) {
        return new Promise(function(success, error){
           $.ajax({
               url: url,
               dataType: 'json',
               success: success,
               error: error
           }) 
        });
    },
    post: function(url, data) {
        return new Promise(function(success, error){
           $.ajax({
               url: url,
               data: data,
               method: 'post',
               type: 'json',
               success: success,
               error: error
           }) 
        });
    },
    patch: function(url, data) {
        return new Promise(function(success, error){
           $.ajax({
               url: url,
               data: data,
               method: 'patch',
               type: 'json',
               success: success,
               error: error
           }) 
        });
    }
    remove: function(url, data) {
        return new Promise(function(success, error){
           $.ajax({
               url: url,
               method: 'delete',
               success: success,
               error: error
           }) 
        });
    }
}