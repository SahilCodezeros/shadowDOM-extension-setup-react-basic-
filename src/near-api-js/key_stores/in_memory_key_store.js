import { KeyStore } from './keystore';
import { KeyPair } from '../utils/key_pair';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Simple in-memory keystore for testing purposes.
 */
export class InMemoryKeyStore extends KeyStore {
    constructor() {
        super();
        this.keys = {};
    }
    /**
     * Sets an in-memory storage item
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The NEAR account tied to the key pair
     * @param keyPair The key pair to store in local storage
     */
    setKey(networkId, accountId, keyPair) {
        return __awaiter(this, void 0, void 0, function* () {
            this.keys[`${accountId}:${networkId}`] = keyPair.toString();
        });
    }
    /**
     * Gets a key from in-memory storage
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The NEAR account tied to the key pair
     * @returns {Promise<KeyPair>}
     */
    getKey(networkId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.keys[`${accountId}:${networkId}`];
            if (!value) {
                return null;
            }
            return KeyPair.fromString(value);
        });
    }
    /**
     * Removes a key from in-memory storage
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @param accountId The NEAR account tied to the key pair
     */
    removeKey(networkId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.keys[`${accountId}:${networkId}`];
        });
    }
    /**
     * Sets all in-memory keys to empty objects
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.keys = {};
        });
    }
    /**
     * Get the network(s) from in-memory storage
     * @returns {Promise<string[]>}
     */
    getNetworks() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new Set();
            Object.keys(this.keys).forEach((key) => {
                const parts = key.split(':');
                result.add(parts[1]);
            });
            return Array.from(result.values());
        });
    }
    /**
     * Gets the account(s) from in-memory storage
     * @param networkId The targeted network. (ex. default, betanet, etc…)
     * @returns{Promise<string[]>}
     */
    getAccounts(networkId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new Array();
            Object.keys(this.keys).forEach((key) => {
                const parts = key.split(':');
                if (parts[parts.length - 1] === networkId) {
                    result.push(parts.slice(0, parts.length - 1).join(':'));
                }
            });
            return result;
        });
    }
    toString() {
        return 'InMemoryKeyStore';
    }
}
