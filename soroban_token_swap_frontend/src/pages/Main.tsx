import { useState } from "react";
import './Main.css';
// import { Connectivity, EditOfferInput } from './connectivity';
import * as tswap from "token-swap";
import * as StellarSdk from "@stellar/stellar-sdk";

// import freighter from "@stellar/freighter-api";

// working around ESM compatibility issues
// const {
//   isConnected,
//   isAllowed,
//     getUserInfo,
//   signTransaction,
// } = freighter;

const log = console.log;
const rpc = "https://rpc-futurenet.stellar.org";
const CONTRACT_ID = tswap.networks.futurenet.contractId;
const tokenSwap = new tswap.Contract({
    contractId: CONTRACT_ID,
    networkPassphrase: tswap.networks.futurenet.networkPassphrase,
    rpcUrl: rpc,
});
const server = new StellarSdk.SorobanRpc.Server(
    // 'http://localhost:8000/soroban/rpc', 
    // { allowHttp: true },
    rpc,
);

const adminSecretKey = 'SBUXJ2P2KBPCTRZELFH6RY3DTR4KR6KRRXCJLC5QQOYGU26DGGTHAWBB';
const offerorSecretKey = 'SAAHOJHIKMKYBS6ISCNQIEVCFBGV2KRV3PKIZUW72DLJTFLS2QOYY7WY';
const acceptorSecretKey = 'SCXSDHS62AGA43FW65UHOHB32S7AD4DEC2RHRSQ7A55MLKSRYTZVXGC4';
const feeSecretKey = 'SBWY3W7P365GIACG2MX3LD5OKU6UY3VEGPDOZWEFTIXKA4IKT6ZQEU64';

const adminKeypair = StellarSdk.Keypair.fromSecret(adminSecretKey);
const offerorKeypair = StellarSdk.Keypair.fromSecret(offerorSecretKey);
const acceptorKeypair = StellarSdk.Keypair.fromSecret(acceptorSecretKey);
const feeKeypair = StellarSdk.Keypair.fromSecret(feeSecretKey);


async function executeTransaction(accKeypair: StellarSdk.Keypair, operation: StellarSdk.xdr.Operation<StellarSdk.Operation.InvokeHostFunction>): Promise<number> {
    const sourceAcc = await server.getAccount(accKeypair.publicKey());
    
    const transaction0 = new StellarSdk.TransactionBuilder(sourceAcc, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: /* SorobanClient.Networks.STANDALONE */ StellarSdk.Networks.FUTURENET,
    }).addOperation(operation)
        .addMemo(StellarSdk.Memo.text("Testing"))
        .setTimeout(180)
        .build();

    const transaction = await server.prepareTransaction(transaction0);
    transaction.sign(accKeypair);
    try {
        const response = await server.sendTransaction(transaction);
        console.log('Sent! Transaction Hash:', response.hash);
        // Poll this until the status is not "pending"
        if (response.status !== "PENDING") {
            console.log('Transaction status:', response.status);
            // console.log(JSON.stringify(response));

            if (response.status === "ERROR") {
                return -1;
            }
        } else {
            let response2;

            do {
                // Wait a second
                await new Promise(resolve => setTimeout(resolve, 1000));

                // See if the transaction is complete
                response2 = await server.getTransaction(response.hash);
            } while (response2.status !== "SUCCESS" && response2.status !== "FAILED");

            console.log('Transaction2 status:', response2.status);
            // console.log(JSON.stringify(response2));

            if (response2.status === "FAILED") {
                return -1;
            }
        }
    } catch (e) {
        console.error('An error has occured:', e);
        return -1;
    }

    return 0;
}

async function checkError() {
    try {
        const errorCode = await tokenSwap.getError();
        console.log("errorCode:", errorCode);
    } catch (err) {
        console.error(err);
    }
}

function Main() {
    const [fee, setFee] = useState(0.25);
    const [feeWallet, setFeeWallet] = useState("GDORZQZP6XJ7JHHZW6PJNTR7LBFNT32LMY7XJ6TLVFFJD6HIKPFYCPTD");
    const [tokenId, setTokenId] = useState("");

    const [offeredToken, setOfferedToken] = useState("CDJ5OIGTEWQEZFNAQSGWF77JLY76SGEGEPZ7Z5KTNIDGKWKJMUDHF4JB");
    const [requestedToken, setRequestedToken] = useState("CCFAFZ4HAZOYIIM4EJHMNYBTJEIVJP22ZX5KBD52BK2OH7KJEQFA4RP2");
    const [offeredTokenAmount, setOfferedTokenAmount] = useState(5000000);
    const [requestedTokenAmount, setRequestedTokenAmount] = useState(500000);
    const [minRequestedTokenAmount,
        setMinRequestedTokenAmount] = useState(100000);

    const [offerId, setOfferId] = useState(0);
    const [newRequestedTokenAmount, setNewRequestedTokenAmount] = useState(800000);
    const [newMinRequestedTokenAmount, setNewMinRequestedTokenAmount] = useState(200000);

    const [amount, setAmount] = useState(100000);

    return (
        <>
            {/* <WalletMultiButton /> */}
            <hr />

            <h3> Admin Side </h3>
            <label htmlFor="">Fee:</label>
            <input type="text" value={fee} style={{ width: '20%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setFee(parseFloat(value));
                }
            }} />
            <label htmlFor="">%</label>
            <label htmlFor="">FeeWallet:</label>
            <input type="text" value={feeWallet} style={{ width: '50%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setFeeWallet(value.toString());
                }
            }} />
            <button onClick={async () => {
                const contract = new StellarSdk.Contract(CONTRACT_ID);
                console.log(`[DAVID] ${feeKeypair.xdrPublicKey()}`);
                const res = await executeTransaction(adminKeypair,
                    contract.call("set_fee",
                        StellarSdk.xdr.ScVal.scvU32(fee * 100),
                        // StellarSdk.xdr.ScVal.scvAddress(StellarSdk.Address.fromString("GDORZQZP6XJ7JHHZW6PJNTR7LBFNT32LMY7XJ6TLVFFJD6HIKPFYCPTD").toScAddress()),
                        StellarSdk.Address.fromString("GDORZQZP6XJ7JHHZW6PJNTR7LBFNT32LMY7XJ6TLVFFJD6HIKPFYCPTD").toScVal(),
                        // StellarSdk.xdr.ScVal.scvAddress(SorobanClient.xdr.ScAddress.scAddressTypeAccount(feeKeypair.xdrPublicKey())),
                    ));
                console.log('result:', res);
            }}> Set Fee </button>
            <br></br>
            <label htmlFor="">TokenId:</label>
            <input type="text" value={tokenId} style={{ width: '50%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setTokenId(value.toString());
                }
            }} />
            <button onClick={async () => {
                const contract = new StellarSdk.Contract(CONTRACT_ID);

                const res = await executeTransaction(adminKeypair,
                    contract.call('allow_token',
                        new StellarSdk.Address(tokenId).toScVal(),
                    ));
                console.log('result:', res);
            }}> Allow Token </button>
            <button onClick={async () => {
                const contract = new StellarSdk.Contract(CONTRACT_ID);

                const res = await executeTransaction(adminKeypair,
                    contract.call('disallow_token',
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.Address.fromString(tokenId).toScAddress()),
                    ));
                console.log('result:', res);
            }}> DisAllow Token</button>

            <br></br>
            <hr></hr>


            <h3>  User Side (Offeror) </h3>
            <label htmlFor="">Offered TokenId:  </label>
            <input type="text" value={offeredToken} style={{ width: '50%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setOfferedToken(value.toString());
                }
            }} /> <br></br>
            <label htmlFor="">Requested TokenId:  </label>
            <input type="text" value={requestedToken} style={{ width: '50%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setRequestedToken(value.toString());
                }
            }} /> <br></br>

            <label htmlFor="">Offered TokenAmount:  </label>
            <input type="number" value={offeredTokenAmount} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setOfferedTokenAmount(parseFloat(value));
                }
            }} /> <br></br>
            <label htmlFor="">Requested Token Amount:  </label>
            <input type="number" value={requestedTokenAmount} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setRequestedTokenAmount(parseFloat(value));
                }
            }} />
            <label htmlFor="">Min Requested Token Amount:  </label>
            <input type="number" value={minRequestedTokenAmount} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setMinRequestedTokenAmount(parseFloat(value));
                }
            }} />
            <br></br>

            <button onClick={async () => {
                if (
                    offeredTokenAmount === 0 ||
                    requestedTokenAmount === 0 ||
                    minRequestedTokenAmount === 0
                ) {
                    // alert("Some passed values remain Zero!");
                    return;
                }

                // try {
                //     const newOfferId = await tokenSwap.create_offer({
                //         offeror: (await getUserInfo()).publicKey,
                //         send_token: offeredToken,
                //         recv_token: requestedToken,
                //         timestamp: /* Date.now() */ 1000,
                //         send_amount: BigInt(offeredTokenAmount),
                //         recv_amount: BigInt(requestedTokenAmount),
                //         min_recv_amount: BigInt(minRequestedTokenAmount),
                //     });
                //     setOfferId(newOfferId);
                //     console.log("offerId:", newOfferId);
                // } catch (err) {
                //     console.error(err);
                // }

                const contract = new StellarSdk.Contract(CONTRACT_ID);
                const res = await executeTransaction(offerorKeypair,
                    contract.call('create_offer',
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.xdr.ScAddress.scAddressTypeAccount(offerorKeypair.xdrPublicKey())),
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.Address.fromString(offeredToken).toScAddress()),
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.Address.fromString(requestedToken).toScAddress()),
                        StellarSdk.xdr.ScVal.scvU32(/* Date.now() */ 1000),
                        StellarSdk.xdr.ScVal.scvU64(new StellarSdk.xdr.Uint64(offeredTokenAmount)),
                        StellarSdk.xdr.ScVal.scvU64(new StellarSdk.xdr.Uint64(requestedTokenAmount)),
                        StellarSdk.xdr.ScVal.scvU64(new StellarSdk.xdr.Uint64(minRequestedTokenAmount)),
                    ),
                );
                console.log('result:', res);

                if (res === 0) {
                    try {
                        const offerCount = (await tokenSwap.countOffers()).result;
                        const newOfferId = offerCount - 1;
                        setOfferId(newOfferId);
                        console.log("offerId: ", newOfferId);
                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    checkError();
                }
            }}>
                Create Offer
            </button>
            <hr></hr>

            <label htmlFor="">OfferId:  </label>
            <input type="text" value={offerId} style={{ width: '50%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setOfferId(parseInt(value, 10));
                }
            }} />
            <br></br>
            <label htmlFor="">new requestedToken amount: </label>
            <input type="number" value={newRequestedTokenAmount} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setNewRequestedTokenAmount(parseFloat(value));
                }
            }} />
            <label htmlFor="">new min requestedToken amount: </label>
            <input type="number" value={newMinRequestedTokenAmount} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setNewMinRequestedTokenAmount(parseFloat(value));
                }
            }} />
            <br></br>

            <button onClick={async () => {
                if (
                    newRequestedTokenAmount === 0 &&
                    newMinRequestedTokenAmount === 0
                ) {
                    // alert("Some passed value remain Zero!");
                    return;
                }

                log("newRequestedTokenAmount: ", newRequestedTokenAmount);
                log("newMinRequestedTokenAmount: ", newMinRequestedTokenAmount);

                // try {
                //     const res = await tokenSwap.update_offer({
                //         offeror:(await getUserInfo()).publicKey,
                //         offer_id: offerId,
                //         recv_amount: BigInt(newRequestedTokenAmount),
                //         min_recv_amount: BigInt(newMinRequestedTokenAmount),
                //     });
                //     console.log('result:', res);
                // } catch (err) {
                //     console.error(err);
                // }

                const contract = new StellarSdk.Contract(CONTRACT_ID);
                const res = await executeTransaction(offerorKeypair,
                    contract.call('update_offer',
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.xdr.ScAddress.scAddressTypeAccount(offerorKeypair.xdrPublicKey())),
                        StellarSdk.xdr.ScVal.scvU32(offerId),
                        StellarSdk.xdr.ScVal.scvU64(new StellarSdk.xdr.Uint64(newRequestedTokenAmount)),
                        StellarSdk.xdr.ScVal.scvU64(new StellarSdk.xdr.Uint64(newMinRequestedTokenAmount)),
                    ),
                );
                console.log('result:', res);

                if (res !== 0) {
                    checkError();
                }
            }}>
                Edit Offer
            </button>

            <button onClick={async () => {
                // try {
                //     const errorCode = await tokenSwap.close_offer({
                //         offeror: (await getUserInfo()).publicKey,
                //         offer_id: offerId,
                //     });
                //     if (errorCode !== 0) {
                //         console.log('error_code: ', errorCode);
                //     }
                // } catch (err) {
                //     console.error(err);
                // }

                const contract = new StellarSdk.Contract(CONTRACT_ID);
                const res = await executeTransaction(offerorKeypair,
                    contract.call('close_offer',
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.xdr.ScAddress.scAddressTypeAccount(offerorKeypair.xdrPublicKey())),
                        StellarSdk.xdr.ScVal.scvU32(offerId),
                    ),
                );
                console.log('result:', res);

                if (res !== 0) {
                    checkError();
                }
            }}
            >Close Offer</button>
            <br></br>
            <br></br>
            <hr></hr>

            <h3>  User Side (Acceptor) </h3>
            <label htmlFor="">OfferId:  </label>
            <input type="text" value={offerId} style={{ width: '50%' }} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setOfferId(parseInt(value, 10));
                }
            }} />
            <label htmlFor="">Amount:  </label>
            <input type="number" value={amount} onChange={(e) => {
                const value = e.target.value;
                if (value) {
                    setAmount(parseFloat(value));
                }
            }} />

            <button onClick={async () => {
                if (
                    amount === 0
                ) {
                    // alert("Amount value remain Zero!");
                    return;
                }

                // console.log('acceptor: ', (await getUserInfo()).publicKey);

                // try {
                //     const errorCode = await tokenSwap.accept_offer({
                //         acceptor: (await getUserInfo()).publicKey,
                //         offer_id: offerId,
                //         amount: BigInt(amount),
                //     });
                //     if (errorCode !== 0) {
                //         console.log('error_code: ', errorCode);
                //     }
                // } catch (err) {
                //     console.error(err);
                // }

                const contract = new StellarSdk.Contract(CONTRACT_ID);
                const res = await executeTransaction(acceptorKeypair,
                    contract.call('accept_offer',
                        StellarSdk.xdr.ScVal.scvAddress(StellarSdk.xdr.ScAddress.scAddressTypeAccount(acceptorKeypair.xdrPublicKey())),
                        StellarSdk.xdr.ScVal.scvU32(offerId),
                        StellarSdk.xdr.ScVal.scvU64(new StellarSdk.xdr.Uint64(amount)),
                    ),
                );
                console.log('result:', res);

                if (res !== 0) {
                    checkError();
                }
            }}>
                Accept Offer
            </button>
            <hr></hr>

            {/* <button onClick={() => {
                // connectivity._listenEvents();
            }}> Start Event Listening</button>

            <button onClick={() => {
                // await connectivity._getAllProgramAccounts();
            }}> Get full info </button> */}

            <button onClick={async () => {
                try {
                    let balances = await tokenSwap.checkBalances({
                        account: offerorKeypair.publicKey(),
                        send_token: offeredToken,
                        recv_token: requestedToken,
                    });
                    console.log(`[DAVID] offeror = ${balances.result}`);
                    balances = await tokenSwap.checkBalances({
                        account: acceptorKeypair.publicKey(),
                        send_token: offeredToken,
                        recv_token: requestedToken,
                    });
                    console.log(`[DAVID] acceptor = ${balances.result}`);
                    balances = await tokenSwap.checkBalances({
                        account: feeKeypair.publicKey(),
                        send_token: offeredToken,
                        recv_token: requestedToken,
                    });
                    console.log(`[DAVID] fee_acc = ${balances.result}`);
                    // const [stkn1, rtkn1, stkn2, rtkn2] = await tokenSwap.checkBalances({
                    //     offeror: offerorKeypair.publicKey(),
                    //     acceptor: acceptorKeypair.publicKey(),
                    //     send_token: offeredToken,
                    //     recv_token: requestedToken,
                    // });
                    // console.log("Offeror's balance of Offered Token:", stkn1);
                    // console.log("Offeror's balance of Requested Token:", rtkn1);
                    // console.log("Acceptor's balance of Offered Token:", stkn2);
                    // console.log("Acceptor's balance of Requested Token:", rtkn2);
                } catch (err) {
                    console.error(err);
                }
            }}> Check Balances </button>
        </>);
}

export default Main;
