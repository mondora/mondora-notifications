var ret = function (element) {
    return function () {
        return element;
    };
};



/*
*   notifications:mark-as-seen method
*/

Tinytest.add("notifications:mark-as-seen - argument type checking", function (test) {
    // TEST
    test.throws(function () {
        Methods["notifications:mark-as-seen"]();
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "First parameter `notificationId` must be a string"
        );
    });
});

Tinytest.add("notifications:mark-as-seen - basic checks", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret();
    Collection = {
        findOne: ret()
    };
    var oldUtilsEnsureBasics = Utils.ensureBasics;
    var called;
    Utils.ensureBasics = function () {
        called = true;
    };
    // TEST
    test.throws(function () {
        Methods["notifications:mark-as-seen"]("notificationId");
    });
    test.equal(called, true);
    // AFTER
    Meteor.user = oldMeteorUser;
    Utils.ensureBasics = oldUtilsEnsureBasics;
});

Tinytest.add("notifications:mark-as-seen - throws if notification is seen", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret({
        _id: "someUserId"
    });
    Collection = {
        findOne: ret({
            userId: "someUserId",
            seen: true
        })
    };
    // TEST
    test.throws(function () {
        Methods["notifications:mark-as-seen"]("someNotificationId");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Notification already marked as seen"
        );
    });
    // AFTER
    Meteor.user = oldMeteorUser;
});

Tinytest.add("notifications:mark-as-seen - updates the notification", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret({
        _id: "someUserId"
    });
    var called;
    Collection = {
        findOne: ret({
            userId: "someUserId"
        }),
        update: function () {
            called = true;
        }
    };
    // TEST
    Methods["notifications:mark-as-seen"]("someNotificationId");
    test.equal(called, true);
    // AFTER
    Meteor.user = oldMeteorUser;
});



/*
*   notifications:run-action method
*/

Tinytest.add("notifications:run-action - argument type checking", function (test) {
    // TEST
    test.throws(function () {
        Methods["notifications:run-action"]();
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "First parameter `actionName` must be a string"
        );
    });
    test.throws(function () {
        Methods["notifications:run-action"]("actionName");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Second parameter `notificationId` must be a string"
        );
    });
});


Tinytest.add("notifications:run-action - basic checks", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret();
    Collection = {
        findOne: ret()
    };
    var oldUtilsEnsureBasics = Utils.ensureBasics;
    var called;
    Utils.ensureBasics = function () {
        called = true;
    };
    // TEST
    test.throws(function () {
        Methods["notifications:run-action"]("actionName", "notificationId");
    });
    test.equal(called, true);
    // AFTER
    Meteor.user = oldMeteorUser;
    Utils.ensureBasics = oldUtilsEnsureBasics;
});

Tinytest.add("notifications:run-action - throws if notification is resolved", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret({
        _id: "someUserId"
    });
    Collection = {
        findOne: ret({
            userId: "someUserId",
            resolved: true
        })
    };
    // TEST
    test.throws(function () {
        Methods["notifications:run-action"]("someAction", "someNotificationId");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Notification already resolved"
        );
    });
    // AFTER
    Meteor.user = oldMeteorUser;
});

Tinytest.add("notifications:run-action - throws if action isn't supported", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret({
        _id: "someUserId"
    });
    Collection = {
        findOne: ret({
            userId: "someUserId",
            availbleActions: ["someAction"]
        })
    };
    Actions = {};
    // TEST
    test.throws(function () {
        Methods["notifications:run-action"]("someOtherAction", "someNotificationId");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Action not supported"
        );
    });
    // AFTER
    Meteor.user = oldMeteorUser;
});

Tinytest.add("notifications:run-action - throws if action doesn't exist", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    Meteor.user = ret({
        _id: "someUserId"
    });
    Collection = {
        findOne: ret({
            userId: "someUserId",
            availableActions: ["someAction"]
        })
    };
    Actions = {};
    // TEST
    test.throws(function () {
        Methods["notifications:run-action"]("someAction", "someNotificationId");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Action doesn't exist"
        );
    });
    // AFTER
    Meteor.user = oldMeteorUser;
});

Tinytest.add("notifications:run-action - runs the action with right arguments and context", function (test) {
    // BEFORE
    var oldMeteorUser = Meteor.user;
    var user = {
        _id: "someUserId"
    };
    var notification = {
        userId: "someUserId",
        availableActions: ["someAction"]
    };
    Meteor.user = ret(user);
    Collection = {
        findOne: ret(notification),
        update: ret()
    };
    var context;
    var args;
    Actions = {
        someAction: function () {
            context = this;
            args = _.toArray(arguments);
        }
    };
    // TEST
    Methods["notifications:run-action"]("someAction", "someNotificationId", "arg1", "arg2");
    test.equal(context.user, user);
    test.equal(context.notification, notification);
    test.equal(args, ["arg1", "arg2"]);
    // AFTER
    Meteor.user = oldMeteorUser;
});
