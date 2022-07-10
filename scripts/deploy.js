const hre = require("hardhat");

async function main() {
  const PostContract = await hre.ethers.getContractFactory("Post");
  const post = await PostContract.deploy();
  await post.deployed();
  console.log("Post contract deployed to:", post.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // 0x6cf909aC78229541D67E98da05B2A954A919F4Ee