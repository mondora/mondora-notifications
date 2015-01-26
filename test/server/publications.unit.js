/*
*   notifications:all publication
*/

Tinytest.add("notifications:all - argument type checking", function (test) {
    // TEST
    test.throws(function () {
        Publications["notifications:all"]("string");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "First parameter `limit` must be either a number or undefined"
        );
    });
});



/*
*   notifications:not-seen publication
*/

Tinytest.add("notifications:not-seen - argument type checking", function (test) {
    // TEST
    test.throws(function () {
        Publications["notifications:not-seen"]("string");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "First parameter `limit` must be either a number or undefined"
        );
    });
});



/*
*   notifications:not-resolved publication
*/

Tinytest.add("notifications:not-resolved - argument type checking", function (test) {
    // TEST
    test.throws(function () {
        Publications["notifications:not-resolved"]("string");
    }, function (e) {
        return (
            e.errorType === "Meteor.Error" &&
            e.reason === "First parameter `limit` must be either a number or undefined"
        );
    });
});
