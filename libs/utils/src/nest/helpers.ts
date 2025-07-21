import { hash, compare, genSalt } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { randomBytes, createHmac, BinaryToTextEncoding } from "crypto";

/**
 * generateSalt
 *
 * @param factor number
 */
export const generateSalt = (factor: number): Promise<string> => {
  return genSalt(factor);
};

/**
 * generateRandomString
 *
 * @param size number
 * @returns string
 */
export const generateRandomString = (size: number): string => {
  return randomBytes(size).toString("hex");
};

/**
 * toHash
 *
 * @param {*} pass
 *
 * password hashing
 */
export const toHash = async (pass: string): Promise<string> => {
  return hash(pass, 10);
};

/**
 * checkHash
 *
 * @param {*} plain
 * @param {*} encrypted
 *
 * compare password hash with plain text
 */
export const checkHash = (
  plain: string,
  encrypted: string
): Promise<boolean> => {
  return compare(plain, encrypted);
};

export const uuid = () => {
  return uuidv4();
};

export const nameFromSlug = (slug: string) => {
  return slug.indexOf("-") !== -1
    ? slug
        .split("-")
        .map((s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
        .join(" ")
    : `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
};

export const getPage = (pageQuery: string): number => {
  const pageNum: number = pageQuery ? parseInt(pageQuery) : 1;

  return pageNum ? pageNum : 1;
};

export const getLimit = (limit: number, pageSize?: string): number => {
  if (!pageSize) {
    return limit;
  }

  return parseInt(pageSize);
};

export const hmacSha256 = (
  key: string,
  str: string,
  type: BinaryToTextEncoding = "binary"
) => {
  return createHmac("sha256", key).update(str).digest(type);
};

export const generateOTP = (length = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);
  return Math.floor(Math.random() * (max - min) + min);
};
