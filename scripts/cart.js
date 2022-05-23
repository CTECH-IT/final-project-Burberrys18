(function (window) {
    'use strict';

    const CHECKLIST_SELECTOR = '[data-gadget-order="checklist"]';
    const SERVER_URL = 'http://saturn.rochesterschools.org/~imran:11001/json';

    let App = window.App;
    let Spy = App.Spy;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;
    let RemoteDataStore = App.RemoteDataStore;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let checkList = new CheckList(CHECKLIST_SELECTOR);



    let mySpy = new Spy('12345', remoteDS);
    window.mySpy = mySpy;

     // if (FormHandler !== undefined) {
       // let formHandler = new FormHandler(FORM_SELECTOR);

       // formHandler.addSubmitHandler(function (data) {
       //     mySpy.createOrder.call(mySpy, data);
       // });
    if (CheckList !== undefined) {
        let checkList = new CheckList(CHECKLIST_SELECTOR);

        remoteDS.getAll((orders) => {
            for (let order of Object.values(orders)) {
                checkList.addRow(order);
            }
        })
    }

    checkList.addClickHandler(mySpy.deliverOrder.bind(mySpy));

    // formHandler.addInputHandler(Validation.isCompanyEmail);


})(window);