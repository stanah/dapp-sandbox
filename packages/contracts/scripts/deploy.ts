import { getAddress } from "viem";
import hre from "hardhat";

async function main() {
  const [owner] = await hre.viem.getWalletClients();
  const gettingStarted = await hre.viem.deployContract("ERC3525GettingStarted", [getAddress(owner.account.address)]);
  console.log(gettingStarted.abi, gettingStarted.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
