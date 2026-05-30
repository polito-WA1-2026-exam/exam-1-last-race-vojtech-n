'use strict';

import { allDb, getDb, runDb, prepQ } from '../config/db.js';

async function registerUser(username, password, salt) {
  await runDb(
    "INSERT INTO user (username, password, salt) VALUES (?, ?, ?)",
    [username, password, salt]
  );
  return username;
};

async function updateBestScore(username, newBest) {
  console.log(newBest);
  await runDb(
    "UPDATE user SET best_score = ? WHERE username = ?",
    [newBest, username]
  );
};

async function registerGame(username) {
  await runDb(
    "UPDATE user SET played_games = played_games + 1 WHERE username = ?",
    [username]
  );
};

async function getUser(username) {
  return await getDb(
    "SELECT username, played_games, best_score FROM user WHERE username = ?",
    [username]
  );
};

async function verifyExistingUser(username) {
  const result = await getDb(
    "SELECT EXISTS(SELECT 1 FROM user WHERE username = ?) AS exist",
    [username]
  );
  return result.exist;
};

async function validateUser(username) {
  return await getDb(
    "SELECT username, password, salt FROM user WHERE username = ?",
    [username]
  );
};

async function getUsersByScore() {
  return await allDb(
    "SELECT username, played_games, best_score FROM user ORDER BY best_score DESC"
  );
};

export { 
  registerUser, verifyExistingUser, validateUser, getUser,
  getUsersByScore, updateBestScore, registerGame 
};