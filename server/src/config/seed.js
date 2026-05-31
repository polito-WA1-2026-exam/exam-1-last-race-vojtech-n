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

const insertEvent = 'INSERT OR IGNORE INTO event (event_id, description, effect) VALUES (?, ?, ?)';

async function populateEvents() {
  await Promise.all([
    runDb(insertEvent, ["e_conductor", "Suddenly, the conductor got on the train. Your ticket is no longer valid... Too bad.", -4]),
    runDb(insertEvent, ["e_dirtyseat", "Whoops! Oh... It's too late for you now. Dirty jeans from this messy seat... What a day!", -3]),
    runDb(insertEvent, ["e_alcoholic", "Someone had more than he could handle. He's pretty loud and he stinks... It wasn't exactly pleasant.", -2]),
    runDb(insertEvent, ["e_beggar", "Typical—a beggar got on the train. He won't budge until you give him a couple of coins.", -1]),
    runDb(insertEvent, ["e_quiet", "Nothing bad happened, nor anything particularly good; it was a bit boring, but a very relaxing ride.", 0]),
    runDb(insertEvent, ["e_oldfriend", "Hey, how have you been? It's been a long time! It's great to see you again, old friend.", 1]),
    runDb(insertEvent, ["e_singer", "What a lovely song—I could listen to it all day long!", 2]),
    runDb(insertEvent, ["e_freebear", "Man, it's crazy hot and you're thirsty, but luckily a fellow student noticed and has two cold ones in his bag. No doubt he'll share one with you.", 3]),
    runDb(insertEvent, ["e_youtuber", "Oh my God, you've got to be kidding me! PewDiePie got on the train and gave you a thousand bucks!", 4]),
  ])
}

export async function seedData() {
  await Promise.all([
    populateUsers(),
    populateEvents(),
  ])
};