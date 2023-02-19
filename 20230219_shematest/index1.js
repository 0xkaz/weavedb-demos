const arweave_wallet = require("./YSReuO6vzkBWd4Tdfe8HE0YLXj4tJokfatsORv7iZ94.json")
// const arweave_wallet = require("./USW6hUOZ9RZm5w9tTVVhnneIFRVmffH0CsHd9H8au-s.json")
const { rpc, contractTxId, collectionName } = require("./config")
const { isNil } = require("ramda")
const { v4: uuidv4 } = require("uuid")

const WeaveDB = require("weavedb-sdk-node")
const db = new WeaveDB({
  arweave_wallet: arweave_wallet,
  wallet: arweave_wallet,
  contractTxId: contractTxId,
})
db.initialize({
  wallet: arweave_wallet,
})
;(async () => {
  console.log(`INFO: start.. ${contractTxId}`)
  console.log(`INFO: url: https://sonar.warp.cc/#/app/contract/${contractTxId}`)

  try {
    console.log("getRules..")
    const ret0 = await db.getRules(collectionName)
    console.log("ret0: ", ret0)
    if (!isNil(ret0) && ret0["allow write"] == true) {
      console.log("already")
    } else {
      // setRules
      console.log("setRules..")
      const ret1 = await db.setRules(rules1, collectionName, {
        ar: arweave_wallet,
      })
      console.log("ret1.success: ", ret1.success)
    }
  } catch (e) {
    console.log(e.message)
  }
  try {
    // setSchema
    const ret2 = await db.setSchema(
      {
        type: "object",
        // "required": ["title","user_address","question"],
        properties: {
          title: { type: "string" },
          question: { type: "string" },
          // "addr": {type: "string"},
          user_address: { type: "string" },
          vote: { type: "number" },
          slug: { type: "string" },
          answers: {
            type: "array",
            items: {
              properties: {
                user_address: { type: "string" },
                answer: { type: "string" },
              },
            },
          },
        },
      },
      collectionName
    )
    console.log("ret2.success: ", ret2.success)

    const ret3 = await db.getSchema(collectionName)
    console.log("ret3: ", ret3)
  } catch (e) {
    console.log(e.message)
  }

  try {
    // console.log("db.add..")
    // const ret3 = await db.add(
    //   {
    //     title: `title_${Date.now()}`,
    //     question: `question_${Date.now()}`,
    //     user_address: `user_address_${Date.now()}`,
    //     // vote: Math.floor(Math.random() * 10),
    //     slug: uuidv4(),
    //   },
    //   collectionName
    // )
    // console.log("ret3: ", ret3)
    // let docId = ""

    // if (!isNil(ret3.docId)) {
    //   docId = ret3.docId
    // } else {

    // }
    let docId = "0I0k1TvLSoyAVnjn4kRx"

    if (docId != "" && !isNil(docId)) {
      // // setRules
      console.log("setRules...")
      const ret4 = await db.setRules(
        { "allow write": true },
        collectionName,
        docId,
        "answers",
        { ar: arweave_wallet }
      )
      console.log("ret4.success: ", ret4.success)

      // add
      console.log("db.add....")
      const ret5 = await db.add(
        {
          user_address: `user_address_${Math.floor(
            Math.random() * 10
          )}_${Date.now()}`,
          answer: `answer_${Math.floor(Math.random() * 10)}_${Date.now()}`,
        },
        collectionName,
        docId,
        "answers"
      )
      console.log("ret5: ", ret5)
    }
  } catch (e) {
    console.log(e.message)
  }

  process.exit()
})()
