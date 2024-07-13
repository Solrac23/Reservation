export function up(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').defaultTo(knex.fn.uuid());
    table.string('first_name', 255).notNullable().checkLength('>=', 3).checkLength('<=', 30);
    table.string('last_name', 255).notNullable().checkLength('>=', 3).checkLength('<=', 30);
    table.string('email', 255).notNullable().unique();
    table.string('phone', 255).notNullable().unique().checkLength('=', 11);
    table.enu("role", ["admin", "user"], {
      enumName: "user_roles"
    }).defaultTo("user").notNullable();
    table.date('date').notNullable();
    table.time('time').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at', {precision: 6}).defaultTo(knex.fn.now(6));
    table.timestamp('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
  })
}

export function down(knex) {
  return knex.schema.dropTable('users');
}
