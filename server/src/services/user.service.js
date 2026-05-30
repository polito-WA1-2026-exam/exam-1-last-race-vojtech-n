'use strict';

import * as UserModel from '../models/user.model.js';
import { generateSalt, hashPassword } from '../utils/crypto.js';

async function registerUser(username, password) {
  const usernameExists = await UserModel.verifyExistingUser(username);

  if (usernameExists) {
    throw { status: 409, message: 'Username already registered!' };
  }

  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  return await UserModel.registerUser(username, hashedPassword, salt);
};

async function getUsersByScore() {
  const users = await UserModel.getUsersByScore();

  return users.map(user => ({
    username: user.username,
    playedGames: user.played_games,
    bestScore: user.best_score
  }));
};

async function updateBestScore(username, newBestScore) {
  const usernameExists = await UserModel.verifyExistingUser(username);

  if (!usernameExists) {
    throw { status: 404, message: 'Following user not found!' };
  }
  return await UserModel.updateBestScore(username, newBestScore);
};

async function registerGame(username) {
  const usernameExists = await UserModel.verifyExistingUser(username);

  if (!usernameExists) {
    throw { status: 404, message: 'Following user not found!' };
  }

  return await UserModel.registerGame(username);
}

export { registerUser, getUsersByScore, updateBestScore, registerGame };