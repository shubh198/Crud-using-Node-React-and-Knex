var knex = require("./knex");
module.exports = {
  users: {
    getAll: function () {
      return knex("users");
    },
    getOne: function (id) {
      return knex("users").where("user_id", id).first();
    },
    create: function (user) {
      return knex("users").insert(user);
    },
    delete: function (id) {
      return knex("users").del().where("user_id", id);
    },
    update: function (changes, id) {
      return knex("users").update(changes).where("user_id", id);
    },
  },
};
