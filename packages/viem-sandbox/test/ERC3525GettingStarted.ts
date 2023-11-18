import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseEther } from "viem";

describe("ERC3525GettingStarted", function () {
  async function deployGettingStartedFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const gettingStarted = await hre.viem.deployContract("ERC3525GettingStarted", [getAddress(owner.account.address)]);
    // ERC3525GettingStarted
    const publicClient = await hre.viem.getPublicClient();
    return {
      gettingStarted,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { gettingStarted, owner } = await loadFixture(deployGettingStartedFixture);
      expect(await gettingStarted.read.owner()).to.equal(getAddress(owner.account.address));
    });
  });

  describe("Mintable", function () {
    describe("Validations", function () {
      it("Should revert with not owner", async function () {
        const { gettingStarted, owner, otherAccount } = await loadFixture(deployGettingStartedFixture);
        const slot = 3525n;
        const value = parseEther("9.5");

        await expect(
          gettingStarted.write.mint([getAddress(owner.account.address), slot, value], { account: otherAccount.account }),
        ).to.be.rejectedWith("ERC3525GettingStarted: only owner can mint");
      });
    });

    describe("Mint", function () {
      it("Should mint to other account", async function () {
        const { gettingStarted, owner, otherAccount } = await loadFixture(deployGettingStartedFixture);
        const slot = 3525n;
        const value = await parseEther("9.5");

        const tokenId = 1n;

        await gettingStarted.write.mint([getAddress(otherAccount.account.address), slot, value]);
        expect(await gettingStarted.read.balanceOf([tokenId])).to.eq(value);
        expect(await gettingStarted.read.slotOf([tokenId])).to.eq(slot);
        expect(await gettingStarted.read.ownerOf([tokenId])).to.eq(getAddress(otherAccount.account.address));
      });
    });
  });
});
