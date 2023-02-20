const sdk = require("weavedb-sdk-node")
require("dotenv").config()
const { privateToAddress } = require("ethereumjs-util")
const Wallet = require("ethereumjs-wallet").default
const { v4: uuidv4 } = require("uuid")
const { isNil } = require("ramda")

const { collectionName, contractTxId } = require("./config.js")

const privateKey = process.env.SECRET_KEY
if (isNil(privateKey) || privateKey == "") {
  console.log("ERROR: you need to set SECRET_KEY=**** in .env")
  exit(0)
}

const signer = `0x${privateToAddress(
  Buffer.from(privateKey.replace(/^0x/, ""), "hex")
).toString("hex")}`
console.log("signer: ", signer)

const wallet = new Wallet(Buffer.from(privateKey.replace(/^0x/, ""), "hex"))

console.log("wallet: ", wallet)
console.log("wallet.getPublicKeyString(): ", wallet.getPublicKeyString())
console.log("wallet.getAddressString(): ", wallet.getAddressString())
// console.log("wallet.getPrivateKeyString(): ", wallet.getPrivateKeyString())

const db = new sdk({
  // wallet: wallet,
  contractTxId: contractTxId,
})

;(async () => {
  console.log(`INFO: start.. ${contractTxId}`)
  console.log(`INFO: url: https://sonar.warp.cc/#/app/contract/${contractTxId}`)

  await db.initializeWithoutWallet()

  console.log("db.setRules")
  const ret1 = await db.setRules({ "allow write": true }, collectionName, {
    wallet: wallet,
  })
  console.log("ret1.success: ", ret1.success)

  console.log("db.add....")
  const ret2 = await db.add(
    {
      slug: uuidv4(),
      time: `${Date.now()}`,
    },
    collectionName,
    { wallet: wallet }
  )
  console.log("ret2.success: ", ret2.success)
})()
