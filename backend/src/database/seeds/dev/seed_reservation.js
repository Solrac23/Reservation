import { v4 as uuid } from "uuid";
import { crypt } from '../../../controller/utils/cryptography.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  let pass = "password";
  await knex('users').insert([
    {
      id: uuid(), 
      first_name: 'Alexander', 
      last_name: 'Frizon',
      email: 'alexander.frizon@example.com',
      phone: '12345678901',
      role: 'admin',
      password: crypt(pass),
      date: '2024-08-01',
      time: '10:00:00',
    },
    {
      id: uuid(),
      first_name: 'John', 
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '98765432101',
      role: 'user',
      password: crypt(pass),
      date: '2024-08-02',
      time: '11:00:00', 
    },
    {
      id: uuid(), 
      first_name: 'Jane', 
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '09876543211',
      role: 'user',
      password: crypt(pass),
      date: '2024-08-03',
      time: '12:00:00',
    }
  ]);
};
