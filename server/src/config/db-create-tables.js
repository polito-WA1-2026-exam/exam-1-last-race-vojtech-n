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

const createEvent = `
  CREATE TABLE IF NOT EXISTS event (
    event_id VARCHAR(100) PRIMARY KEY,
    description TEXT NOT NULL,
    effect INTEGER NOT NULL
  );
`;

const createStation = `
  CREATE TABLE IF NOT EXISTS station (
    station_name VARCHAR(200) PRIMARY KEY,
    neighbour_1 VARCHAR(200) NOT NULL,
    neighbour_2 VARCHAR(200),
    neighbour_3 VARCHAR(200),
    neighbour_4 VARCHAR(200)
  );
`;

const createDistance = `
  CREATE TABLE IF NOT EXISTS distance (
    station_a VARCHAR(200),
    station_b VARCHAR(200),
    distance INTEGER,
    PRIMARY KEY (station_a, station_b)
  );
`

export async function createTables() {
  await Promise.all([
    runDb(createUser),
    runDb(createStation),
    runDb(createDistance),
    runDb(createEvent),
  ]);
  // await runDb(createCourseView);
  // await runDb(createStudyPlanView);
}