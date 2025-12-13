/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	const exists = await knex.schema.hasTable("reservations");

	if (!exists){
		return knex.schema.createTable("reservations", function(table) {
			table.increments("id");
			table.primary("id");
			table.text("phone", 255)
				.notNullable()
				.checkLength("=", 11);
			table.date("date").notNullable();
			table.time("time").notNullable();
			table.integer("people", 255).notNullable();
			table.text("user_id").notNullable();
			table.foreign("user_id").references("users.id").onUpdate("CASCADE").onDelete("RESTRICT");
			table.text("created_at").defaultTo(knex.fn.now());
			table.text("updated_at").defaultTo(knex.fn.now());
		});
	}
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable("reservations");
}
