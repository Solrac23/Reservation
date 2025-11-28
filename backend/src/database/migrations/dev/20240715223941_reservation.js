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
			table.string("phone", 255)
				.notNullable()
				.checkLength("=", 11);
			table.date("date").notNullable();
			table.time("time").notNullable();
			table.integer("people", 255).notNullable();
			table.uuid("user_id").defaultTo(knex.fn.uuid()).notNullable();
			table.foreign("user_id").references("users.id").onUpdate("CASCADE").onDelete("RESTRICT");
			table.timestamp("created_at", {precision: 6}).defaultTo(knex.fn.now(6));
			table.timestamp("updated_at").defaultTo(knex.fn.now());
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
