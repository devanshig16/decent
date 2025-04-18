// /app/lib/tableland_storage.js
import { Database } from '@tableland/sdk';
import { connectMetaMask } from './walletConnect';

const db = new Database();
const userTable = 'user_meta_1_58';
const candidateTable = 'candidate_1_61';

// User Role Management
export async function addUser(wallet, role) {
  const stmt = `INSERT INTO ${userTable} (wallet, role, status) VALUES ('${wallet}', '${role}', 'active');`;
  const result = await db.prepare(stmt).run();
  console.log('User added:', result);
  return result;
}

export async function getUser(wallet) {
  const stmt = `SELECT * FROM ${userTable} WHERE wallet = '${wallet}';`;
  const { results } = await db.prepare(stmt).all();
  return results;
}

export async function getUserStatus(wallet) {
  const stmt = `SELECT role FROM ${userTable} WHERE wallet = '${wallet}';`;
  const { results } = await db.prepare(stmt).all();
  return results.length > 0 ? results[0].role : null;
}

// Candidate Profile Functions
export async function getCandidateProfile(wallet) {
  const stmt = `SELECT * FROM ${candidateTable} WHERE wallet = '${wallet}';`;
  const { results } = await db.prepare(stmt).all();
  return results.length > 0 ? results[0] : null;
}

export async function addCandidateProfile(wallet, name, bio, skills, image) {
  const createdAt = new Date().toISOString();
  const stmt = `
    INSERT INTO ${candidateTable} (wallet, name, bio, skills, image, created_at)
    VALUES ('${wallet}', '${name}', '${bio}', '${skills}', '${image}', '${createdAt}');
  `;
  const result = await db.prepare(stmt).run();
  return result;
}

export async function updateCandidateProfile(wallet, name, bio, skills, image) {
  const stmt = `
    UPDATE ${candidateTable}
    SET name = '${name}', bio = '${bio}', skills = '${skills}', image = '${image}'
    WHERE wallet = '${wallet}';
  `;
  const result = await db.prepare(stmt).run();
  return result;
}

export async function getAllCandidateProfiles() {
  const stmt = `SELECT * FROM ${candidateTable};`;
  const { results } = await db.prepare(stmt).all();
  return results;
}
