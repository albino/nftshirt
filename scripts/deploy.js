async function main() {
  const TShirtNFT = await ethers.getContractFactory("TShirtNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const tshirtNFT = await TShirtNFT.deploy()
  await tshirtNFT.deployed()
  console.log("Contract deployed to address:", tshirtNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
