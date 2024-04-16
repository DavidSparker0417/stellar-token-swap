import { ContractSpec } from '@stellar/stellar-sdk';
import { AssembledTransaction } from './assembled-tx.js';
import type { u32, u64 } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly futurenet: {
        readonly networkPassphrase: "Test SDF Future Network ; October 2022";
        readonly contractId: "CCDLVLPKKL5PHO7NVRVJJAEG5MGXWELKAIQCNB5IL67DJ76A5EAV2QDW";
    };
};
/**
    
    */
export interface FeeInfo {
    /**
      
      */
    fee_rate: u32;
    /**
      
      */
    fee_wallet: string;
}
/**
    
    */
export declare enum OfferStatus {
    INIT = 0,
    ACTIVE = 1,
    COMPLETE = 2,
    CANCEL = 3
}
/**
    
    */
export interface OfferInfo {
    /**
      
      */
    min_recv_amount: u64;
    /**
      
      */
    offeror: string;
    /**
      
      */
    recv_amount: u64;
    /**
      
      */
    recv_token: string;
    /**
      
      */
    send_amount: u64;
    /**
      
      */
    send_token: string;
    /**
      
      */
    status: OfferStatus;
}
/**
    
    */
export interface OfferKey {
    /**
      
      */
    offeror: string;
    /**
      
      */
    recv_token: string;
    /**
      
      */
    send_token: string;
    /**
      
      */
    timestamp: u32;
}
/**
    
    */
export type DataKey = {
    tag: "FEE";
    values: void;
} | {
    tag: "Allowance";
    values: readonly [string];
} | {
    tag: "OfferCount";
    values: void;
} | {
    tag: "RegOffers";
    values: readonly [u32];
} | {
    tag: "ErrorCode";
    values: void;
};
/**
    
    */
export declare const Errors: {};
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    private readonly parsers;
    private txFromJSON;
    readonly fromJSON: {
        setFee: (json: string) => AssembledTransaction<void>;
        getFee: (json: string) => AssembledTransaction<readonly [number, string]>;
        allowToken: (json: string) => AssembledTransaction<void>;
        disallowToken: (json: string) => AssembledTransaction<void>;
        getError: (json: string) => AssembledTransaction<number>;
        countOffers: (json: string) => AssembledTransaction<number>;
        createOffer: (json: string) => AssembledTransaction<number>;
        acceptOffer: (json: string) => AssembledTransaction<number>;
        updateOffer: (json: string) => AssembledTransaction<number>;
        closeOffer: (json: string) => AssembledTransaction<number>;
        loadOffer: (json: string) => AssembledTransaction<readonly [string, string, string, bigint, bigint, bigint, number]>;
        checkBalances: (json: string) => AssembledTransaction<readonly [bigint, bigint]>;
    };
    /**
* Construct and simulate a set_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    setFee: ({ fee_rate, fee_wallet }: {
        fee_rate: u32;
        fee_wallet: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a get_fee transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getFee: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<readonly [number, string]>>;
    /**
* Construct and simulate a allow_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    allowToken: ({ token }: {
        token: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a disallow_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    disallowToken: ({ token }: {
        token: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a get_error transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    getError: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a count_offers transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    countOffers: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a create_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    createOffer: ({ offeror, send_token, recv_token, timestamp, send_amount, recv_amount, min_recv_amount }: {
        offeror: string;
        send_token: string;
        recv_token: string;
        timestamp: u32;
        send_amount: u64;
        recv_amount: u64;
        min_recv_amount: u64;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a accept_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    acceptOffer: ({ acceptor, offer_id, amount }: {
        acceptor: string;
        offer_id: u32;
        amount: u64;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a update_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    updateOffer: ({ offeror, offer_id, recv_amount, min_recv_amount }: {
        offeror: string;
        offer_id: u32;
        recv_amount: u64;
        min_recv_amount: u64;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a close_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    closeOffer: ({ offeror, offer_id }: {
        offeror: string;
        offer_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a load_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    loadOffer: ({ offer_id }: {
        offer_id: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<readonly [string, string, string, bigint, bigint, bigint, number]>>;
    /**
* Construct and simulate a check_balances transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    checkBalances: ({ account, send_token, recv_token }: {
        account: string;
        send_token: string;
        recv_token: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<readonly [bigint, bigint]>>;
}
