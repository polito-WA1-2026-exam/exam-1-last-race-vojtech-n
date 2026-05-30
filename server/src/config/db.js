'use strict';

import sqlite3 from 'sqlite3';
import path from 'path';

const dbName = 'database.sqlite';
const dbPath = path.join(import.meta.dirname, '../../data', dbName)

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error initializing database: ', err);
  } else {
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
  }
});

// All results that satisfies condition (if specified)
async function allDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
};

// Getting single result
async function getDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
};

async function runDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
};

// Good for parametrized queries that runs frequently
function prepQ(sql) {
  return db.prepare(sql);
};

export { allDb, getDb, runDb, prepQ };