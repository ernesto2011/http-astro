import { db, Clients} from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO\
	await db.insert(Clients).values([
		{
			id: 1,
			name: 'Ernesto',
			age: 30,
			isActive: true
		},
		{
			id: 2,
			name: 'Juan',
			age: 20,
			isActive: true
		},
		{
			id: 3,
			name: 'Pedro',
			age: 25,
			isActive: true
		}
	])
}
