// Register methods
Meteor.methods(Methods);

// Register publications
_.forEach(Publications, function (value, key) {
    Meteor.publish(key, value);
});

// Public API object
Notifications = {

    registerAction: function (action) {
        check(action.name, String);
        check(action.description, String);
        check(action.fn, Function);
        Actions[action.name] = action;
    },

    create: function (notification) {
        Collection.insert(notification);
    }

};
