'use strict';

import { runDb } from './db.js';

const createUser = `
  CREATE TABLE IF NOT EXISTS user (
    username VARCHAR(200) PRIMARY KEY,
    played_games INTEGER DEFAULT 0,
    best_score INTEGER DEFAULT 0,
    password TEXT,
    salt TEXT
  );
`;

export async function createTables() {
  await Promise.all([
    runDb(createUser),
  ]);
  // await runDb(createCourseView);
  // await runDb(createStudyPlanView);
}