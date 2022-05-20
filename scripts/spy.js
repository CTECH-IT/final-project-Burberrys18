(function (window) {
    'use strict';

    let App = window.App || {};

    function Spy(spyId, db) {
        this.spyId = spyId;
        this.db = db;
    }

    Shop.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    }

    Shop.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    }

    Shop.prototype.printOrder = function() {
        //first, get all the email addresses (key)
        let customerIdArray = Objects.keys(this.db.getAll());

        console.log('Shop #' + this.shopId + ' has pending orders:');
        //go through the list of emails and get the associated order
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    }

    App.Spy = Spy;
    window.App = App;

})(window);