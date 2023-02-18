const arweave_wallet = require("./YSReuO6vzkBWd4Tdfe8HE0YLXj4tJokfatsORv7iZ94.json")
const { rpc, contractTxId } = require("./config")
const { isNil } = require("ramda")

const WeaveDB = require("weavedb-sdk-node")
const sdk = new WeaveDB({
  // wallet: arweave_wallet,
  arweave_wallet: arweave_wallet,
  contractTxId: contractTxId,
})
// In case the wallet is not set, you can run initializeWithoutWallet() after the instantiation.
// await sdk.initializeWithoutWallet()
// // Or you can assign the wallet later. Note initialize() is not an async-function.
sdk.initialize({
  // wallet: ADMIN_ARWEAVE_WALLET_JSON
  wallet: arweave_wallet,
})
;(async () => {
  console.log(`INFO: start.. ${contractTxId}`)
  console.log(`INFO: url: https://sonar.warp.cc/#/app/contract/${contractTxId}`)
  const newOwner = "0x0Fa4fE1a58a7815ADBc16D74111462661843B83B"

  // // setRules
  // try {
  //   const ret1 = await sdk.setRules({ "allow write": true }, collectionName);
  //   console.log("ret1.success: ", ret1.success);
  // } catch (e) {
  //   console.log(e.message);
  // }

  // addOwner
  try {
    const ret1 = await sdk.addOwner(newOwner, { ar: arweave_wallet })
    console.log("ret1.success: ", ret1.success)
  } catch (e) {
    console.log(e.message)
  }

  // getOwner
  try {
    const ret2 = await sdk.getOwner()
    console.log("ret2: ", ret2)
  } catch (e) {
    console.log(e.message)
  }
  process.exit()
})()
