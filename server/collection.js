var schema = new SimpleSchema({
    userId: {
        type: String
    },
    date: {
        type: Number
    },
    type: {
        type: String
    },
    message: {
        type: String
    },
    details: {
        type: Object,
        blackbox: true,
        optional: true
    },
    resolved: {
        type: Boolean
    },
    seen: {
        type: Boolean
    },
    availableActions: {
        type: [String]
    }
});

Collection = new Mongo.Collection("notifications");
Collection.attachSchema(schema);
