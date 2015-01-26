Package.describe({
    name: "mondora:notifications",
    summary: "Notifications package for meteor",
    version: "0.1.0",
    git: "https://github.com/mondora/mondora-notifications.git"
});

Package.onUse(function (api) {
    // Supported Meteor versions
    api.versionsFrom("METEOR@0.9.0");
    // Server dependencies
    api.use("underscore", "server");
    // Exports
    api.export("Notifications", "server");
    // Package files
    api.addFiles([
        "server/utils.js",
        "server/actions.js",
        "server/collection.js",
        "server/methods.js",
        "server/publications.js",
        "server/notifications.js"
    ], "server");
});

Package.onTest(function (api) {
    // Test dependencies
    api.use("underscore");
    api.use("tinytest");
    // Package files
    api.addFiles([
        "server/utils.js",
        "server/methods.js",
        "server/publications.js"
        ], "server");
    // Test files
    api.addFiles([
        "test/server/utils.unit.js",
        "test/server/methods.unit.js",
        "test/server/publications.unit.js"
    ], "server");
});
