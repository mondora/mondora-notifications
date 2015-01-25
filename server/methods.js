Methods = {

    "notifications:mark-as-seen": function (notificationId) {
        // Type checks
        Utils.ensure(
            Match.test(notificationId, String),
            "First parameter `notificationId` must be a string"
        );
        // Fetch necessary data
        var user = Meteor.user();
        var notification = Collection.findOne({
            _id: notificationId
        });
        // Basic checks
        Utils.ensureBasics(user, notification);
        // Method specific checks
        Utils.ensure(
            !notification.seen,
            "Notification already marked as seen"
        );
        Collection.update({
            _id: notificationId
        }, {
            $set: {
                seen: true
            }
        });
    },

    "notifications:run-action": function (actionName, notificationId /*, ... */) {
        // Types checks
        Utils.ensure(
            Match.test(actionName, String),
            "First parameter `actionName` must be a string"
        );
        Utils.ensure(
            Match.test(notificationId, String),
            "Second parameter `notificationId` must be a string"
        );
        // Fetch necessary data
        var user = Meteor.user();
        var notification = Collection.findOne({
            _id: notificationId
        });
        // Basic checks
        Utils.ensureBasics(user, notification);
        // Method specific checks
        Utils.ensure(
            !notification.resolved,
            "Notification already resolved"
        );
        Utils.ensure(
            _.contains(notification.availableActions, actionName),
            "Action not supported"
        );
        Utils.ensure(
            Actions[actionName],
            "Action doesn't exist"
        );
        var context = {
            notification: notification,
            user: user,
            resolve: function () {
                this.resolved = true;
            }
        };
        Actions[actionName].apply(context, _.rest(arguments, 2));
    }

};
