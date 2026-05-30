'use strict';

import { runDb } from './db.js';
import { generateSalt, hashPassword } from '../utils/crypto.js';

// Row won't be inserted if it results in a duplicate key
const insertUser = 'INSERT OR IGNORE INTO user (username, played_games, best_score, password, salt) VALUES (?, ?, ?, ?, ?)';

const vSalt = generateSalt();
const vPass = hashPassword('123vojtech', vSalt);
const aSalt = generateSalt();
const aPass = hashPassword('321anna', aSalt);
const kSalt = generateSalt();
const kPass = hashPassword('213krystof', kSalt);

async function populateUsers() {
  await Promise.all([
    runDb(insertUser, ['vojtech', 0, 0, vPass, vSalt]),
    runDb(insertUser, ['anna', 3, 12, aPass, aSalt]),
    runDb(insertUser, ['krystof', 1, 30, kPass, kSalt])
  ])
};

export async function seedData() {
  await Promise.all([
    populateUsers()
  ])
};