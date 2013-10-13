(function (global) {
    var AddTaskViewModel,
        app = global.app = global.app || {};

    AddTaskViewModel = kendo.data.ObservableObject.extend({
        selectedDate:"",
        selectedLocaion:"",
        displayLocaion:"",
        addtaskDataSource: null,
        notificationOnDateOnly: true,
        tasks:[],
        
        init: function () {
            var that = this;
            kendo.data.ObservableObject.fn.init.apply(that, []);
            
            console.log(location);
            //that.set("selectedLocaion", location);
        },
        
        onLocationSelected: function(currentPosition)
        {            
            var url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=";
            var lat = currentPosition.lb;
            var lng= currentPosition.mb;
            var location = 
            {
                "latitude":lat,
               "longitude":lng
            };
            app.addTaskService.viewModel.set("selectedLocaion",location);
            
            url = url + lat + "," + lng;
            httpRequest.getJSON(url)
            .then(function (addressData) {
                var fullAddress = addressData.results[1].formatted_address;
                var parts = fullAddress.split(',');
                app.addTaskService.viewModel.set("displayLocaion", parts[0]);
            });
        },
        
        onDateSelected: function(currentDate)
        {
            var displayDate = currentDate.toString().substring(0,15);
            app.addTaskService.viewModel.set("selectedDate", displayDate);            
        },
        
        onSwitchChange: function(e)
        {
            var onDateOnly = e.checked ? true : false; 
            app.addTaskService.viewModel.set("notificationOnDateOnly", onDateOnly);
        },
        
        onAddTask: function(e)
        {
            var that = this;
            var range = $('#task-range').val();
            var notes = $('#task-notes').val();
            console.log(range);
            var task =            
            {
                "location": that.get("selectedLocaion"),
                "date": that.get("selectedDate"),
                "range": range,
                "onDateOnly": that.get("notificationOnDateOnly"),
                "notes": notes
            };
            that.tasks.push(task);
            window.localStorage.setItem("tasks", that.get("tasks"));
            console.log(task);
            
            navigator.notification.alert(
                'Task has been successfully added!',  // message
                function(){},         // callback
                'Task added',            // title
                'OK'                  // buttonName
            );

        },
    });

    app.addTaskService = {
        viewModel: new AddTaskViewModel()
    };
})(window);