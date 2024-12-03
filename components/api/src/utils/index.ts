import fs from 'fs';
import { join } from 'path';
import { customAlphabet } from 'nanoid';
import { Telnet } from 'telnet-client';

export const PROJECT_DIR = join(__dirname, '../../');

export const STATIC_DIR = join(PROJECT_DIR, 'static');

export function sortUUID(length: number) {
  const nanoid = customAlphabet('1234567890abcdef', length);
  return nanoid();
}

export class FileManager {
  static isExists(path: string) {
    return fs.existsSync(path);
  }

  static mkdirIfNotExists(path: string) {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
  }

  static isDir(path: string) {
    return fs.lstatSync(path).isDirectory();
  }

  static readDir(path: string) {
    return fs.readdirSync(path);
  }

  static read(path: string) {
    return fs.readFileSync(path, 'utf8');
  }

  static write(path: string, content: string) {
    return fs.writeFileSync(path, content);
  }

  static readLines(path: string) {
    const content = fs.readFileSync(path);
    return content.toString().split('\n').filter(Boolean);
  }

  static readJson(path: string) {
    return JSON.parse(this.read(path));
  }

  static writeJson(path: string, json: object) {
    return this.write(path, JSON.stringify(json, null, 2));
  }
}

export async function testTcp(host: string, port: number) {
  const telent = new Telnet();

  try {
    await telent.connect({ host, port, negotiationMandatory: false, timeout: 1000 });
    return true;
  } catch (error) {
    return false;
  }
}
