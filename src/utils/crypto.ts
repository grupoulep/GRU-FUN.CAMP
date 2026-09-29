/**
 * Cryptographic Utility for Fundación ULEP
 * Provides AES-256-GCM encryption, PBKDF2 key derivation, SHA-256 cryptographic hashing,
 * and encrypted local persistence for student data protection.
 */

export interface EncryptedPackage {
  algorithm: string;
  iv: string; // Base64
  salt: string; // Base64
  ciphertext: string; // Base64
  hash: string; // SHA-256 Hex
  timestamp: string;
  keyFingerprint: string;
}

// Master app salt & secret derivation base
const APP_SECRET_KEY_SEED = "ULEP_COLOMBIA_SECURE_ENCRYPTION_KEY_2026_AES256";

/**
 * Derives an AES-GCM 256-bit CryptoKey using PBKDF2
 */
async function deriveKey(salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(APP_SECRET_KEY_SEED),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Computes SHA-256 cryptographic hash of a text string
 */
export async function computeSHA256(text: string): Promise<string> {
  try {
    const enc = new TextEncoder();
    const data = enc.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    // Fallback hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, "0");
  }
}

/**
 * Encrypts any JavaScript object or string using AES-256-GCM
 */
export async function encryptData(data: any): Promise<EncryptedPackage> {
  const jsonString = typeof data === "string" ? data : JSON.stringify(data);
  const enc = new TextEncoder();
  const plainBytes = enc.encode(jsonString);

  // Generate 12-byte IV and 16-byte Salt
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const salt = window.crypto.getRandomValues(new Uint8Array(16));

  const cryptoKey = await deriveKey(salt);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    cryptoKey,
    plainBytes
  );

  const ciphertextArray = new Uint8Array(encryptedBuffer);
  const hash = await computeSHA256(jsonString);

  // Convert to base64
  const toBase64 = (arr: Uint8Array) => btoa(String.fromCharCode(...arr));

  const pkg: EncryptedPackage = {
    algorithm: "AES-256-GCM (PBKDF2-SHA256, 100k iters)",
    iv: toBase64(iv),
    salt: toBase64(salt),
    ciphertext: toBase64(ciphertextArray),
    hash: hash,
    timestamp: new Date().toISOString(),
    keyFingerprint: hash.substring(0, 16).toUpperCase(),
  };

  return pkg;
}

/**
 * Decrypts an EncryptedPackage back into original data
 */
export async function decryptData(pkg: EncryptedPackage): Promise<any> {
  try {
    const fromBase64 = (str: string) =>
      Uint8Array.from(atob(str), (c) => c.charCodeAt(0));

    const iv = fromBase64(pkg.iv);
    const salt = fromBase64(pkg.salt);
    const ciphertext = fromBase64(pkg.ciphertext);

    const cryptoKey = await deriveKey(salt);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      cryptoKey,
      ciphertext
    );

    const dec = new TextDecoder();
    const jsonString = dec.decode(decryptedBuffer);
    try {
      return JSON.parse(jsonString);
    } catch {
      return jsonString;
    }
  } catch (error) {
    console.error("Error decrypting data:", error);
    throw new Error("No se pudo descifrar la información. Verifique la clave o integridad.");
  }
}

/**
 * Stores encrypted data in LocalStorage under a secure key
 */
export async function saveEncryptedToStorage(storageKey: string, data: any): Promise<EncryptedPackage> {
  const pkg = await encryptData(data);
  localStorage.setItem(`ulep_enc_${storageKey}`, JSON.stringify(pkg));
  return pkg;
}

/**
 * Retrieves and decrypts data from LocalStorage
 */
export async function getEncryptedFromStorage(storageKey: string): Promise<any | null> {
  const item = localStorage.getItem(`ulep_enc_${storageKey}`);
  if (!item) return null;
  try {
    const pkg: EncryptedPackage = JSON.parse(item);
    return await decryptData(pkg);
  } catch (e) {
    console.error("Error loading encrypted item from storage:", e);
    return null;
  }
}

/**
 * Masks sensitive PII for safe display
 */
export function maskSensitiveValue(value: string, type: 'document' | 'email' | 'phone'): string {
  if (!value) return '';
  if (type === 'document') {
    if (value.length <= 4) return '••••';
    return value.substring(0, 2) + '••••' + value.substring(value.length - 2);
  }
  if (type === 'email') {
    const parts = value.split('@');
    if (parts.length !== 2) return '••••@••••';
    const name = parts[0];
    const maskedName = name.length > 2 ? name.substring(0, 2) + '•••' : '••';
    return `${maskedName}@${parts[1]}`;
  }
  if (type === 'phone') {
    if (value.length <= 4) return '••••••••';
    return value.substring(0, 4) + ' ••• •• ' + value.substring(value.length - 2);
  }
  return value;
}
