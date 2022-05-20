(function (window) {
    'use strict';

    let App = window.App || {};
    let $ = window.jQuery;
    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addClickHandler = function (func) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            func(email);
        }.bind(this));
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-panda-order="checkbox"]')
            .remove();
    }

    CheckList.prototype.addRow = function (bobaOrder) {
        var rowElement = new Row(bobaOrder);
        this.$element.append(rowElement.$element);
    };

    function Row(gadgetOrder) {
        let $div = $('<div></div>', {
            'data-gadget-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');

        let $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: gadgetOrder.emailAddress
        });

        let description;
        if (gadgetOrder.kingsman) {
            description = gadgetOrder.kingsman + '' + quantity;
        }
        if (gadgetOrder.spykids) {
            description += gadgetOrder.spykids + '' + quantity; 
        }
        description += ' (' + gadgetOrder.emailAddress + ')';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);