/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary("id", {
      constraintName: "users_id_primary_key",
    });
    table.string('first_name', 255).notNullable().checkLength('>=', 3).checkLength('<=', 30);
    table.string('last_name', 255).notNullable().checkLength('>=', 3).checkLength('<=', 30);
    table.string('email', 255).notNullable().unique();
    table.enu("role", ["admin", "user"], {
      enumName: "user_roles"
    }).defaultTo("user").notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at', {precision: 6}).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    table.unique("id")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users');
}
