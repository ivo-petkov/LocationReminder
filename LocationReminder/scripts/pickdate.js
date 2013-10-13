(function (global) {
    var DateViewModel,
        app = global.app = global.app || {};

    DateViewModel = kendo.data.ObservableObject.extend({
        currentDate:"",
        
        init: function () {
            var that = this;
           
            
               
        },
       
    });

    app.dateService = {       
        viewModel: new DateViewModel()
    };
}
)(window);