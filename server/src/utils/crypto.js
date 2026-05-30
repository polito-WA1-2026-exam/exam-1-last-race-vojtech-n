'use strict';

import crypto from 'crypto';

const KEY_LEN = 16; // denotes length of the key

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
};

function hashPassword(password, salt) {
  // by default returns buffer, converts to hexadecimal
  return crypto.scryptSync(password, salt, KEY_LEN).toString('hex');
};

function verifyPassword(password, salt, storedHash) {
  const hash = hashPassword(password, salt);
  
  // does not leak timing information that would allow an attacker to guess one of the values
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(storedHash)
  );
};

export { generateSalt, hashPassword, verifyPassword };