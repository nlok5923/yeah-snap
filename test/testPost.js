const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testing social dapp!", () => {
  let Contract, deployedContract;
  beforeEach(async () => {
    Contract = await ethers.getContractFactory("Post");
    deployedContract = await Contract.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("testing contract utilities", () => {
    it("Should add images", async () => {
      const addPostTxn = await deployedContract.addPost("thisiscid", "thisiscaptiontext");
      addPostTxn.wait();
      console.log(addPostTxn);
      const post = await deployedContract.getPost();
      console.log(post);
      expect(post[0].imageCID).to.equal("thisiscid");
      expect(post[0].captionText).to.equal("thisiscaptiontext");
    })

  })

})