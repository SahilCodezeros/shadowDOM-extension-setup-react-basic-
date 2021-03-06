import { Account } from './account';
import { SCHEMA, createTransaction } from './transaction';
import { KeyPair, serialize, PublicKey } from './utils';
import { base_decode } from './utils/serialize';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const LOGIN_WALLET_URL_SUFFIX = '/login/';
const MULTISIG_HAS_METHOD = 'add_request_and_confirm';
const LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key';
const PENDING_ACCESS_KEY_PREFIX = 'pending_key'; // browser storage key for a pending access key (i.e. key has been generated but we are not sure it was added yet)
export class WalletConnection {
    constructor(near, appKeyPrefix) {
        this._near = near;
        const authDataKey = appKeyPrefix + LOCAL_STORAGE_KEY_SUFFIX;
        const authData = JSON.parse(window.localStorage.getItem(authDataKey));
        this._networkId = near.config.networkId;
        this._walletBaseUrl = near.config.walletUrl;
        appKeyPrefix = appKeyPrefix || near.config.contractName || 'default';
        this._keyStore = near.connection.signer.keyStore;
        this._authData = authData || { allKeys: [] };
        this._authDataKey = authDataKey;
        if (!this.isSignedIn()) {
            this._completeSignInWithAccessKey();
        }
    }
    /**
     * Returns true, if this WalletAccount is authorized with the wallet.
     * @example
     * walletAccount.isSignedIn();
     */
    isSignedIn() {
        return !!this._authData.accountId;
    }
    /**
     * Returns authorized Account ID.
     * @example
     * walletAccount.getAccountId();
     */
    getAccountId() {
        return this._authData.accountId || '';
    }
    /**
     * Redirects current page to the wallet authentication page.
     * @param contractId The NEAR account where the contract is deployed
     * @param title Name of the application that will appear as requesting access in Wallet
     * @param successUrl Optional url to redirect upon success
     * @param failureUrl Optional url to redirect upon failure
     *
     * @example
     *   walletAccount.requestSignIn(
     *     account-with-deploy-contract,
     *     "Guest Book",
     *     "https://example.com/success.html",
     *     "https://example.com/error.html");
     */
    requestSignIn(contractId, title, successUrl, failureUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getAccountId() || (yield this._keyStore.getKey(this._networkId, this.getAccountId()))) {
                return Promise.resolve();
            }
            const currentUrl = new URL(window.location.href);
            const newUrl = new URL(this._walletBaseUrl + LOGIN_WALLET_URL_SUFFIX);
            newUrl.searchParams.set('title', title);
            newUrl.searchParams.set('contract_id', contractId);
            newUrl.searchParams.set('success_url', successUrl || currentUrl.href);
            newUrl.searchParams.set('failure_url', failureUrl || currentUrl.href);
            newUrl.searchParams.set('app_url', currentUrl.origin);
            const accessKey = KeyPair.fromRandom('ed25519');
            newUrl.searchParams.set('public_key', accessKey.getPublicKey().toString());
            yield this._keyStore.setKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(), accessKey);
            window.location.assign(newUrl.toString());
        });
    }
    /**
     * Requests the user to quickly sign for a transaction or batch of transactions
     * @param transactions Array of Transaction objects that will be requested to sign
     * @param callbackUrl The url to navigate to after the user is prompted to sign
     */
    requestSignTransactions(transactions, callbackUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUrl = new URL(window.location.href);
            const newUrl = new URL('sign', this._walletBaseUrl);
            newUrl.searchParams.set('transactions', transactions
                .map(transaction => serialize.serialize(SCHEMA, transaction))
                .map(serialized => Buffer.from(serialized).toString('base64'))
                .join(','));
            newUrl.searchParams.set('callbackUrl', callbackUrl || currentUrl.href);
            window.location.assign(newUrl.toString());
        });
    }
    /**
     * Complete sign in for a given account id and public key. To be invoked by the app when getting a callback from the wallet.
     */
    _completeSignInWithAccessKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUrl = new URL(window.location.href);
            const publicKey = currentUrl.searchParams.get('public_key') || '';
            const allKeys = (currentUrl.searchParams.get('all_keys') || '').split(',');
            const accountId = currentUrl.searchParams.get('account_id') || '';
            // TODO: Handle situation when access key is not added
            if (accountId && publicKey) {
                this._authData = {
                    accountId,
                    allKeys
                };
                window.localStorage.setItem(this._authDataKey, JSON.stringify(this._authData));
                yield this._moveKeyFromTempToPermanent(accountId, publicKey);
            }
            currentUrl.searchParams.delete('public_key');
            currentUrl.searchParams.delete('all_keys');
            currentUrl.searchParams.delete('account_id');
            window.history.replaceState({}, document.title, currentUrl.toString());
        });
    }
    /**
     *
     * @param accountId The NEAR account owning the given public key
     * @param publicKey The public key being set to the key store
     */
    _moveKeyFromTempToPermanent(accountId, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyPair = yield this._keyStore.getKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);
            yield this._keyStore.setKey(this._networkId, accountId, keyPair);
            yield this._keyStore.removeKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);
        });
    }
    /**
     * Sign out from the current account
     * @example
     * walletAccount.signOut();
     */
    signOut() {
        this._authData = {};
        window.localStorage.removeItem(this._authDataKey);
    }
    /**
     * Returns the current connected wallet account
     */
    account() {
        if (!this._connectedAccount) {
            this._connectedAccount = new ConnectedWalletAccount(this, this._near.connection, this._authData.accountId);
        }
        return this._connectedAccount;
    }
}
export const WalletAccount = WalletConnection;
/**
 * {@link Account} implementation which redirects to wallet using (@link WalletConnection) when no local key is available.
 */
class ConnectedWalletAccount extends Account {
    constructor(walletConnection, connection, accountId) {
        super(connection, accountId);
        this.walletConnection = walletConnection;
    }
    // Overriding Account methods
    signAndSendTransaction(receiverId, actions) {
        const _super = Object.create(null, {
            signAndSendTransaction: { get: () => super.signAndSendTransaction }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready;
            const localKey = yield this.connection.signer.getPublicKey(this.accountId, this.connection.networkId);
            let accessKey = yield this.accessKeyForTransaction(receiverId, actions, localKey);
            if (!accessKey) {
                throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
            }
            if (localKey && localKey.toString() === accessKey.public_key) {
                try {
                    return yield _super.signAndSendTransaction.call(this, receiverId, actions);
                }
                catch (e) {
                    // TODO: Use TypedError when available
                    if (e.message.includes('does not have enough balance')) {
                        accessKey = yield this.accessKeyForTransaction(receiverId, actions);
                    }
                    else {
                        throw e;
                    }
                }
            }
            const publicKey = PublicKey.from(accessKey.public_key);
            // TODO: Cache & listen for nonce updates for given access key
            const nonce = accessKey.access_key.nonce + 1;
            const status = yield this.connection.provider.status();
            const blockHash = base_decode(status.sync_info.latest_block_hash);
            const transaction = createTransaction(this.accountId, publicKey, receiverId, nonce, actions, blockHash);
            yield this.walletConnection.requestSignTransactions([transaction], window.location.href);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('Failed to redirect to sign transaction'));
                }, 1000);
            });
            // TODO: Aggregate multiple transaction request with "debounce".
            // TODO: Introduce TrasactionQueue which also can be used to watch for status?
        });
    }
    /**
     * Check if given access key allows the function call or method attempted in transaction
     * @param accessKey Array of {access_key: AccessKey, public_key: PublicKey} items
     * @param receiverId The NEAR account attempting to have access
     * @param actions The action(s) needed to be checked for access
     */
    accessKeyMatchesTransaction(accessKey, receiverId, actions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { access_key: { permission } } = accessKey;
            if (permission === 'FullAccess') {
                return true;
            }
            if (permission.FunctionCall) {
                const { receiver_id: allowedReceiverId, method_names: allowedMethods } = permission.FunctionCall;
                /********************************
                Accept multisig access keys and let wallets attempt to signAndSendTransaction
                If an access key has itself as receiverId and method permission add_request_and_confirm, then it is being used in a wallet with multisig contract: https://github.com/near/core-contracts/blob/671c05f09abecabe7a7e58efe942550a35fc3292/multisig/src/lib.rs#L149-L153
                ********************************/
                if (allowedReceiverId === this.accountId && allowedMethods.includes(MULTISIG_HAS_METHOD)) {
                    return true;
                }
                if (allowedReceiverId === receiverId) {
                    if (actions.length !== 1) {
                        return false;
                    }
                    const [{ functionCall }] = actions;
                    return functionCall &&
                        (!functionCall.deposit || functionCall.deposit.toString() === "0") && // TODO: Should support charging amount smaller than allowance?
                        (allowedMethods.length === 0 || allowedMethods.includes(functionCall.methodName));
                    // TODO: Handle cases when allowance doesn't have enough to pay for gas
                }
            }
            // TODO: Support other permissions than FunctionCall
            return false;
        });
    }
    /**
     * Helper function returning the access key (if it exists) to the receiver that grants the designated permission
     * @param receiverId The NEAR account seeking the access key for a transaction
     * @param actions The action(s) sought to gain access to
     * @param localKey A local public key provided to check for access
     * @returns Promise<any>
     */
    accessKeyForTransaction(receiverId, actions, localKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessKeys = yield this.getAccessKeys();
            if (localKey) {
                const accessKey = accessKeys.find(key => key.public_key === localKey.toString());
                if (accessKey && (yield this.accessKeyMatchesTransaction(accessKey, receiverId, actions))) {
                    return accessKey;
                }
            }
            const walletKeys = this.walletConnection._authData.allKeys;
            for (const accessKey of accessKeys) {
                if (walletKeys.indexOf(accessKey.public_key) !== -1 && (yield this.accessKeyMatchesTransaction(accessKey, receiverId, actions))) {
                    return accessKey;
                }
            }
            return null;
        });
    }
}
