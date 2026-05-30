'use strict';

import app from './src/app.js';
import { createTables } from './src/config/db-create-tables.js';
import { seedData } from './src/config/seed.js';

const PORT = 3001;

const init = async () => {
  console.group('Initialization Application Data');
  console.log('1. Creating tables..')
  await createTables();
  console.log('2. Seeding data..');
  await seedData();
  console.groupEnd('Initialization Application Data');

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

await init();