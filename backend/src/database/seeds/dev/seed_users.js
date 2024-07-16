import { v4 as uuid } from "uuid";
import { crypt } from '../../../controller/utils/cryptography.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("reservations").del();
  await knex('users').del()

  let pass = "password";
  await knex('users').insert([
    {
      id: uuid(), 
      first_name: 'Alexander', 
      last_name: 'Frizon',
      email: 'alexander.frizon@example.com',
      role: 'admin',
      password: crypt(pass)
    },
    {
      id: uuid(),
      first_name: 'John', 
      last_name: 'Doe',
      email: 'john.doe@example.com',
      role: 'user',
      password: crypt(pass)
    },
    {
      id: uuid(), 
      first_name: 'Jane', 
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      password: crypt(pass),
    }
  ]);

  await knex("reservations").insert([
    {
      id: 1,
      user_id: knex("users").select("id").first().where({ email: "alexander.frizon@example.com" }),
      date: "2024-08-01",
      time: "10:00:00",
      phone: "12345678901",
    },
    {
      id: 2,
      user_id: knex("users").select("id").first().where({ email: "john.doe@example.com" }),
      date: "2024-08-02",
      time: "11:00:00",
      phone: "98765432101",
    },
    {
      id: 3,
      user_id: knex("users").select("id").first().where({ email: "jane.smith@example.com" }),
      date: "2024-08-03",
      time: "12:00:00",
      phone: "09876543211",
    }
  ]);
};
