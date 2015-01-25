var checkLimit = function (limit) {
    // Type checks
    Utils.ensure(
        Match.test(limit, Match.Optional(Number)),
        "First parameter `limit` must be either a number or undefined"
    );
};

Publications = {

    "notifications:all": function (limit) {
        // Type checks
        checkLimit(limit);
        return Collection.find({
            userId: this.userId
        }, {
            limit: limit
        });
    },

    "notifications:not-seen": function (limit) {
        // Type checks
        checkLimit(limit);
        return Collection.find({
            userId: this.userId,
            seen: false
        }, {
            limit: limit
        });
    },

    "notifications:not-resolved": function (limit) {
        // Type checks
        checkLimit(limit);
        return Collection.find({
            userId: this.userId,
            resolved: false
        }, {
            limit: limit
        });
    }

};
