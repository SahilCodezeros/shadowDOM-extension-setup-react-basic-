import sha256 from 'js-sha256';
import { Enum, Assignable } from './utils/enums';
import { serialize, deserialize } from './utils/serialize';
import { PublicKey } from './utils/key_pair';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

export class FunctionCallPermission extends Assignable {
}
export class FullAccessPermission extends Assignable {
}
export class AccessKeyPermission extends Enum {
}
export class AccessKey extends Assignable {
}
export function fullAccessKey() {
    return new AccessKey({ nonce: 0, permission: new AccessKeyPermission({ fullAccess: new FullAccessPermission({}) }) });
}
export function functionCallAccessKey(receiverId, methodNames, allowance) {
    return new AccessKey({ nonce: 0, permission: new AccessKeyPermission({ functionCall: new FunctionCallPermission({ receiverId, allowance, methodNames }) }) });
}
export class IAction extends Assignable {
}
class CreateAccount extends IAction {
}
class DeployContract extends IAction {
}
class FunctionCall extends IAction {
}
class Transfer extends IAction {
}
class Stake extends IAction {
}
class AddKey extends IAction {
}
class DeleteKey extends IAction {
}
class DeleteAccount extends IAction {
}
export function createAccount() {
    return new Action({ createAccount: new CreateAccount({}) });
}
export function deployContract(code) {
    return new Action({ deployContract: new DeployContract({ code }) });
}
/**
 * Constructs {@link Action} instance representing contract method call.
 *
 * @param methodName the name of the method to call
 * @param args arguments to pass to method. Can be either plain JS object which gets serialized as JSON automatically
 *  or `Uint8Array` instance which represents bytes passed as is.
 * @param gas max amount of gas that method call can use
 * @param deposit amount of NEAR (in yoctoNEAR) to send together with the call
 */
export function functionCall(methodName, args, gas, deposit) {
    const anyArgs = args;
    const isUint8Array = anyArgs.byteLength !== undefined && anyArgs.byteLength === anyArgs.length;
    const serializedArgs = isUint8Array ? args : Buffer.from(JSON.stringify(args));
    return new Action({ functionCall: new FunctionCall({ methodName, args: serializedArgs, gas, deposit }) });
}
export function transfer(deposit) {
    return new Action({ transfer: new Transfer({ deposit }) });
}
export function stake(stake, publicKey) {
    return new Action({ stake: new Stake({ stake, publicKey }) });
}
export function addKey(publicKey, accessKey) {
    return new Action({ addKey: new AddKey({ publicKey, accessKey }) });
}
export function deleteKey(publicKey) {
    return new Action({ deleteKey: new DeleteKey({ publicKey }) });
}
export function deleteAccount(beneficiaryId) {
    return new Action({ deleteAccount: new DeleteAccount({ beneficiaryId }) });
}
export class Signature extends Assignable {
}
export class Transaction extends Assignable {
    encode() {
        return serialize(SCHEMA, this);
    }
    static decode(bytes) {
        return deserialize(SCHEMA, Transaction, bytes);
    }
}
export class SignedTransaction extends Assignable {
    encode() {
        return serialize(SCHEMA, this);
    }
    static decode(bytes) {
        return deserialize(SCHEMA, SignedTransaction, bytes);
    }
}
/**
 * Contains a list of the valid transaction Actions available with this API
 */
export class Action extends Enum {
}
export const SCHEMA = new Map([
    [Signature, { kind: 'struct', fields: [
                ['keyType', 'u8'],
                ['data', [64]]
            ] }],
    [SignedTransaction, { kind: 'struct', fields: [
                ['transaction', Transaction],
                ['signature', Signature]
            ] }],
    [Transaction, { kind: 'struct', fields: [
                ['signerId', 'string'],
                ['publicKey', PublicKey],
                ['nonce', 'u64'],
                ['receiverId', 'string'],
                ['blockHash', [32]],
                ['actions', [Action]]
            ] }],
    [PublicKey, { kind: 'struct', fields: [
                ['keyType', 'u8'],
                ['data', [32]]
            ] }],
    [AccessKey, { kind: 'struct', fields: [
                ['nonce', 'u64'],
                ['permission', AccessKeyPermission],
            ] }],
    [AccessKeyPermission, { kind: 'enum', field: 'enum', values: [
                ['functionCall', FunctionCallPermission],
                ['fullAccess', FullAccessPermission],
            ] }],
    [FunctionCallPermission, { kind: 'struct', fields: [
                ['allowance', { kind: 'option', type: 'u128' }],
                ['receiverId', 'string'],
                ['methodNames', ['string']],
            ] }],
    [FullAccessPermission, { kind: 'struct', fields: [] }],
    [Action, { kind: 'enum', field: 'enum', values: [
                ['createAccount', CreateAccount],
                ['deployContract', DeployContract],
                ['functionCall', FunctionCall],
                ['transfer', Transfer],
                ['stake', Stake],
                ['addKey', AddKey],
                ['deleteKey', DeleteKey],
                ['deleteAccount', DeleteAccount],
            ] }],
    [CreateAccount, { kind: 'struct', fields: [] }],
    [DeployContract, { kind: 'struct', fields: [
                ['code', ['u8']]
            ] }],
    [FunctionCall, { kind: 'struct', fields: [
                ['methodName', 'string'],
                ['args', ['u8']],
                ['gas', 'u64'],
                ['deposit', 'u128']
            ] }],
    [Transfer, { kind: 'struct', fields: [
                ['deposit', 'u128']
            ] }],
    [Stake, { kind: 'struct', fields: [
                ['stake', 'u128'],
                ['publicKey', PublicKey]
            ] }],
    [AddKey, { kind: 'struct', fields: [
                ['publicKey', PublicKey],
                ['accessKey', AccessKey]
            ] }],
    [DeleteKey, { kind: 'struct', fields: [
                ['publicKey', PublicKey]
            ] }],
    [DeleteAccount, { kind: 'struct', fields: [
                ['beneficiaryId', 'string']
            ] }],
]);
export function createTransaction(signerId, publicKey, receiverId, nonce, actions, blockHash) {
    return new Transaction({ signerId, publicKey, nonce, receiverId, actions, blockHash });
}
/**
 * Signs a given transaction from an account with given keys, applied to the given network
 * @param transaction The Transaction object to sign
 * @param signer The {Signer} object that assists with signing keys
 * @param accountId The human-readable NEAR account name
 * @param networkId The targeted network. (ex. default, betanet, etc…)
 */
function signTransactionObject(transaction, signer, accountId, networkId) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = serialize(SCHEMA, transaction);
        const hash = new Uint8Array(sha256.sha256.array(message));
        const signature = yield signer.signMessage(message, accountId, networkId);
        const signedTx = new SignedTransaction({
            transaction,
            signature: new Signature({ keyType: transaction.publicKey.keyType, data: signature.signature })
        });
        return [hash, signedTx];
    });
}
export function signTransaction(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (args[0].constructor === Transaction) {
            const [transaction, signer, accountId, networkId] = args;
            return signTransactionObject(transaction, signer, accountId, networkId);
        }
        else {
            const [receiverId, nonce, actions, blockHash, signer, accountId, networkId] = args;
            const publicKey = yield signer.getPublicKey(accountId, networkId);
            const transaction = createTransaction(accountId, publicKey, receiverId, nonce, actions, blockHash);
            return signTransactionObject(transaction, signer, accountId, networkId);
        }
    });
}
