/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable("user", function(table) {
		table.primary("id").increments();
		table.text("first_name", 255).notNullable().checkLength(">=", 3).checkLength("<=", 30);
		table.text("last_name", 255).notNullable().checkLength(">=", 3).checkLength("<=", 30);
		table.text("email", 255).notNullable().unique();
		table.enu("role", ["admin", "user"], {
			enumName: "user_roles"
		}).defaultTo("user").notNullable();
		table.text("password").notNullable();
		table.text("created_at").defaultTo(knex.fn.now());
		table.text("updated_at").defaultTo(knex.fn.now());
		table.unique("id");
	});
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable("user");
}
