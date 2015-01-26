/*
*   Utils.ensure
*/

Tinytest.add("Utils.ensure - throws if first parameter is falsy", function (test) {
    // TEST
    test.throws(function () {
        Utils.ensure(false, "reason");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "reason"
        );
    });
});



/*
*   Utils.ensureBasics
*/

Tinytest.add("Utils.ensureBasics - throws if user is undefined", function (test) {
    // TEST
    test.throws(function () {
        Utils.ensureBasics(null, {});
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Login required"
        );
    });
});

Tinytest.add("Utils.ensureBasics - throws if notification is undefined", function (test) {
    // TEST
    test.throws(function () {
        Utils.ensureBasics({}, null);
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Notification doesn't exist"
        );
    });
});

Tinytest.add("Utils.ensureBasics - throws if notification doesn't belong to user", function (test) {
    // TEST
    test.throws(function () {
        Utils.ensureBasics({_id: "userId"}, {userId: "differentUserId"});
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "Notification doesn't belong to user"
        );
    });
});
