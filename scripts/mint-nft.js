require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/TShirtNFT.sol/TShirtNFT.json")

const contractAddress = "0x31dd27bd9c00dbe2a1297ddb8609ed060258d107"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
	const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

	const tx = {
		"from": PUBLIC_KEY,
		"to": contractAddress,
		"nonce": nonce,
		"gas": 500000,
		"data": nftContract.methods.mintNFT(
			PUBLIC_KEY,
			"ipfs://QmU1Qac1gwhquhQJmVD4qnkHNA2af4aGDU5zuLRSe6eq5Q"
		).encodeABI()
	};

	const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
	signPromise
	.then((signedTx) => {
		web3.eth.sendSignedTransaction(
			signedTx.rawTransaction,
			function (err, hash) {
				if (!err) {
					console.log("yay! ", hash);
				} else {
					console.log("on no! ", err);
				}
			}
		)
	})
	.catch((err) => {
		console.log("very bad: ", err);
	})
}

mintNFT();
