import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User, UserRole } from './users/entities/user.entity';

dotenv.config();

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: +(process.env.POSTGRES_PORT || 5432),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'qwerty',
    database: process.env.POSTGRES_DB || 'examcrm',
    entities: [User],
    synchronize: true,
  });
  await ds.initialize();
  const repo = ds.getRepository(User);
  const exists = await repo.findOne({ where: { email: 'boltoboyevjamshidbek68@gmail.com' } });
  if (!exists) {
    const admin = repo.create({ email: 'boltoboyevjamshidbek68@gmail.com', password: 'jamshid20070613', name: 'Admin', role: UserRole.ADMIN });
    await repo.save(admin);
    console.log('Admin user seeded: boltoboyevjamshidbek68@gmail.com (password: set in seed)');
  }
  await ds.destroy();
}

seed().catch(console.error);
