import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction } from './assembled-tx.js';
export * from './assembled-tx.js';
export * from './method-options.js';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    futurenet: {
        networkPassphrase: "Test SDF Future Network ; October 2022",
        contractId: "CCQJNFGDMOB6OEASW2NWRHA6HARCJPTIIQT3U7WS5QMI6OD2H4N7RXBL",
    }
};
/**
    
    */
export var OfferStatus;
(function (OfferStatus) {
    OfferStatus[OfferStatus["INIT"] = 0] = "INIT";
    OfferStatus[OfferStatus["ACTIVE"] = 1] = "ACTIVE";
    OfferStatus[OfferStatus["COMPLETE"] = 2] = "COMPLETE";
    OfferStatus[OfferStatus["CANCEL"] = 3] = "CANCEL";
})(OfferStatus || (OfferStatus = {}));
/**
    
    */
export const Errors = {};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
            "AAAAAQAAAAAAAAAAAAAAB0ZlZUluZm8AAAAAAgAAAAAAAAAIZmVlX3JhdGUAAAAEAAAAAAAAAApmZWVfd2FsbGV0AAAAAAAT",
            "AAAAAwAAAAAAAAAAAAAAC09mZmVyU3RhdHVzAAAAAAQAAAAAAAAABElOSVQAAAAAAAAAAAAAAAZBQ1RJVkUAAAAAAAEAAAAAAAAACENPTVBMRVRFAAAAAgAAAAAAAAAGQ0FOQ0VMAAAAAAAD",
            "AAAAAQAAAAAAAAAAAAAACU9mZmVySW5mbwAAAAAAAAcAAAAAAAAAD21pbl9yZWN2X2Ftb3VudAAAAAAGAAAAAAAAAAdvZmZlcm9yAAAAABMAAAAAAAAAC3JlY3ZfYW1vdW50AAAAAAYAAAAAAAAACnJlY3ZfdG9rZW4AAAAAABMAAAAAAAAAC3NlbmRfYW1vdW50AAAAAAYAAAAAAAAACnNlbmRfdG9rZW4AAAAAABMAAAAAAAAABnN0YXR1cwAAAAAH0AAAAAtPZmZlclN0YXR1cwA=",
            "AAAAAQAAAAAAAAAAAAAACE9mZmVyS2V5AAAABAAAAAAAAAAHb2ZmZXJvcgAAAAATAAAAAAAAAApyZWN2X3Rva2VuAAAAAAATAAAAAAAAAApzZW5kX3Rva2VuAAAAAAATAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAE",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABgAAAAAAAAAAAAAAA0ZFRQAAAAABAAAAAAAAAAlBbGxvd2FuY2UAAAAAAAABAAAAEwAAAAAAAAAAAAAACk9mZmVyQ291bnQAAAAAAAEAAAAAAAAACVJlZ09mZmVycwAAAAAAAAEAAAAEAAAAAAAAAAAAAAAJRXJyb3JDb2RlAAAAAAAAAAAAAAAAAAAFQWRtaW4AAAA=",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAJc2V0X2FkbWluAAAAAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAHc2V0X2ZlZQAAAAACAAAAAAAAAAhmZWVfcmF0ZQAAAAQAAAAAAAAACmZlZV93YWxsZXQAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAHZ2V0X2ZlZQAAAAAAAAAAAQAAA+0AAAACAAAABAAAABM=",
            "AAAAAAAAAAAAAAALYWxsb3dfdG9rZW4AAAAAAQAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAOZGlzYWxsb3dfdG9rZW4AAAAAAAEAAAAAAAAABXRva2VuAAAAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAJZ2V0X2Vycm9yAAAAAAAAAAAAAAEAAAAE",
            "AAAAAAAAAAAAAAAMY291bnRfb2ZmZXJzAAAAAAAAAAEAAAAE",
            "AAAAAAAAAAAAAAAMY3JlYXRlX29mZmVyAAAABwAAAAAAAAAHb2ZmZXJvcgAAAAATAAAAAAAAAApzZW5kX3Rva2VuAAAAAAATAAAAAAAAAApyZWN2X3Rva2VuAAAAAAATAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAEAAAAAAAAAAtzZW5kX2Ftb3VudAAAAAAGAAAAAAAAAAtyZWN2X2Ftb3VudAAAAAAGAAAAAAAAAA9taW5fcmVjdl9hbW91bnQAAAAABgAAAAEAAAAE",
            "AAAAAAAAAAAAAAAMYWNjZXB0X29mZmVyAAAAAwAAAAAAAAAIYWNjZXB0b3IAAAATAAAAAAAAAAhvZmZlcl9pZAAAAAQAAAAAAAAABmFtb3VudAAAAAAABgAAAAEAAAAE",
            "AAAAAAAAAAAAAAAMdXBkYXRlX29mZmVyAAAABAAAAAAAAAAHb2ZmZXJvcgAAAAATAAAAAAAAAAhvZmZlcl9pZAAAAAQAAAAAAAAAC3JlY3ZfYW1vdW50AAAAAAYAAAAAAAAAD21pbl9yZWN2X2Ftb3VudAAAAAAGAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAALY2xvc2Vfb2ZmZXIAAAAAAgAAAAAAAAAHb2ZmZXJvcgAAAAATAAAAAAAAAAhvZmZlcl9pZAAAAAQAAAABAAAABA==",
            "AAAAAAAAAAAAAAAKbG9hZF9vZmZlcgAAAAAAAQAAAAAAAAAIb2ZmZXJfaWQAAAAEAAAAAQAAA+0AAAAHAAAAEwAAABMAAAATAAAABgAAAAYAAAAGAAAABA==",
            "AAAAAAAAAAAAAAAOY2hlY2tfYmFsYW5jZXMAAAAAAAMAAAAAAAAAB2FjY291bnQAAAAAEwAAAAAAAAAKc2VuZF90b2tlbgAAAAAAEwAAAAAAAAAKcmVjdl90b2tlbgAAAAAAEwAAAAEAAAPtAAAAAgAAAAYAAAAG"
        ]);
    }
    parsers = {
        initialize: () => { },
        setAdmin: () => { },
        setFee: () => { },
        getFee: (result) => this.spec.funcResToNative("get_fee", result),
        allowToken: () => { },
        disallowToken: () => { },
        getError: (result) => this.spec.funcResToNative("get_error", result),
        countOffers: (result) => this.spec.funcResToNative("count_offers", result),
        createOffer: (result) => this.spec.funcResToNative("create_offer", result),
        acceptOffer: (result) => this.spec.funcResToNative("accept_offer", result),
        updateOffer: (result) => this.spec.funcResToNative("update_offer", result),
        closeOffer: (result) => this.spec.funcResToNative("close_offer", result),
        loadOffer: (result) => this.spec.funcResToNative("load_offer", result),
        checkBalances: (result) => this.spec.funcResToNative("check_balances", result)
    };
    txFromJSON = (json) => {
        const { method, ...tx } = JSON.parse(json);
        return AssembledTransaction.fromJSON({
            ...this.options,
            method,
            parseResultXdr: this.parsers[method],
        }, tx);
    };
    fromJSON = {
        initialize: (this.txFromJSON),
        setAdmin: (this.txFromJSON),
        setFee: (this.txFromJSON),
        getFee: (this.txFromJSON),
        allowToken: (this.txFromJSON),
        disallowToken: (this.txFromJSON),
        getError: (this.txFromJSON),
        countOffers: (this.txFromJSON),
        createOffer: (this.txFromJSON),
        acceptOffer: (this.txFromJSON),
        updateOffer: (this.txFromJSON),
        closeOffer: (this.txFromJSON),
        loadOffer: (this.txFromJSON),
        checkBalances: (this.txFromJSON)
    };
    /**
* Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    initialize = async ({ admin }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'initialize',
            args: this.spec.funcArgsToScVals("initialize", { admin: new Address(admin) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['initialize'],
        });
    };
    /**
* Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setAdmin = async ({ new_admin }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'set_admin',
            args: this.spec.funcArgsToScVals("set_admin", { new_admin: new Address(new_admin) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setAdmin'],
        });
    };
    /**
* Construct and simulate a set_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setFee = async ({ fee_rate, fee_wallet }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'set_fee',
            args: this.spec.funcArgsToScVals("set_fee", { fee_rate, fee_wallet: new Address(fee_wallet) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['setFee'],
        });
    };
    /**
* Construct and simulate a get_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getFee = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_fee',
            args: this.spec.funcArgsToScVals("get_fee", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getFee'],
        });
    };
    /**
* Construct and simulate a allow_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    allowToken = async ({ token }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'allow_token',
            args: this.spec.funcArgsToScVals("allow_token", { token: new Address(token) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['allowToken'],
        });
    };
    /**
* Construct and simulate a disallow_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    disallowToken = async ({ token }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'disallow_token',
            args: this.spec.funcArgsToScVals("disallow_token", { token: new Address(token) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['disallowToken'],
        });
    };
    /**
* Construct and simulate a get_error transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getError = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'get_error',
            args: this.spec.funcArgsToScVals("get_error", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['getError'],
        });
    };
    /**
* Construct and simulate a count_offers transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    countOffers = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'count_offers',
            args: this.spec.funcArgsToScVals("count_offers", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['countOffers'],
        });
    };
    /**
* Construct and simulate a create_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    createOffer = async ({ offeror, send_token, recv_token, timestamp, send_amount, recv_amount, min_recv_amount }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'create_offer',
            args: this.spec.funcArgsToScVals("create_offer", { offeror: new Address(offeror), send_token: new Address(send_token), recv_token: new Address(recv_token), timestamp, send_amount, recv_amount, min_recv_amount }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['createOffer'],
        });
    };
    /**
* Construct and simulate a accept_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    acceptOffer = async ({ acceptor, offer_id, amount }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'accept_offer',
            args: this.spec.funcArgsToScVals("accept_offer", { acceptor: new Address(acceptor), offer_id, amount }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['acceptOffer'],
        });
    };
    /**
* Construct and simulate a update_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    updateOffer = async ({ offeror, offer_id, recv_amount, min_recv_amount }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'update_offer',
            args: this.spec.funcArgsToScVals("update_offer", { offeror: new Address(offeror), offer_id, recv_amount, min_recv_amount }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['updateOffer'],
        });
    };
    /**
* Construct and simulate a close_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    closeOffer = async ({ offeror, offer_id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'close_offer',
            args: this.spec.funcArgsToScVals("close_offer", { offeror: new Address(offeror), offer_id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['closeOffer'],
        });
    };
    /**
* Construct and simulate a load_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    loadOffer = async ({ offer_id }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'load_offer',
            args: this.spec.funcArgsToScVals("load_offer", { offer_id }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['loadOffer'],
        });
    };
    /**
* Construct and simulate a check_balances transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    checkBalances = async ({ account, send_token, recv_token }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'check_balances',
            args: this.spec.funcArgsToScVals("check_balances", { account: new Address(account), send_token: new Address(send_token), recv_token: new Address(recv_token) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['checkBalances'],
        });
    };
}
