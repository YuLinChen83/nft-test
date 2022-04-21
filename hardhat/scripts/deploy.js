const main = async () => {
  const initialSupply = ethers.utils.parseEther("100"); //100,000 * 10 ^18

  const [deployer] = await ethers.getSigners();
  console.log(
    `Address deploying the contract ---> ${deployer.address}, balance: ${(
      await deployer.getBalance()
    ).toString()}`
  );

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(initialSupply);
  console.log(`Token contract address ---> ${token.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
