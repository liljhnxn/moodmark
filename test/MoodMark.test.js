import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("MoodMark Smart Contract (Expanded Moods)", function () {
  let MoodMark;
  let moodMark;
  let owner;
  let addr1;
  let addr2;

  // Mood enum values mapping:
  const Mood = {
    Happy: 0,
    Okay: 1,
    Sad: 2,
    Excited: 3,
    Tired: 4,
    Cool: 5,
    Angry: 6,
    Loved: 7,
    Anxious: 8,
  };

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MoodMark = await ethers.getContractFactory("MoodMark");
    moodMark = await MoodMark.deploy();
    await moodMark.waitForDeployment();
  });

  describe("Mood Retrieval & Initial State", function () {
    it("An unset wallet is correctly identified", async function () {
      const [savedMood, hasMood] = await moodMark.getMood(owner.address);
      expect(hasMood).to.equal(false);
      expect(savedMood).to.equal(Mood.Happy);
    });
  });

  describe("Setting Moods", function () {
    it("A wallet can save all valid moods", async function () {
      for (const [name, val] of Object.entries(Mood)) {
        await moodMark.connect(owner).setMood(val);
        const [savedMood, hasMood] = await moodMark.getMood(owner.address);
        expect(hasMood).to.equal(true);
        expect(savedMood).to.equal(val, `Failed for mood: ${name}`);
      }
    });

    it("A wallet can update its mood from Tired to Excited", async function () {
      await moodMark.connect(owner).setMood(Mood.Tired);
      let [savedMood, hasMood] = await moodMark.getMood(owner.address);
      expect(hasMood).to.equal(true);
      expect(savedMood).to.equal(Mood.Tired);

      await moodMark.connect(owner).setMood(Mood.Excited);
      [savedMood, hasMood] = await moodMark.getMood(owner.address);
      expect(hasMood).to.equal(true);
      expect(savedMood).to.equal(Mood.Excited);
    });

    it("Invalid mood values are rejected (boundary > 8)", async function () {
      await expect(moodMark.connect(owner).setMood(9)).to.be.revertedWithCustomError(
        moodMark,
        "InvalidMood"
      );
      await expect(moodMark.connect(owner).setMood(255)).to.be.revertedWithCustomError(
        moodMark,
        "InvalidMood"
      );
    });

    it("The MoodUpdated event is emitted correctly", async function () {
      await expect(moodMark.connect(owner).setMood(Mood.Cool))
        .to.emit(moodMark, "MoodUpdated")
        .withArgs(owner.address, Mood.Cool);

      await expect(moodMark.connect(owner).setMood(Mood.Loved))
        .to.emit(moodMark, "MoodUpdated")
        .withArgs(owner.address, Mood.Loved);
    });
  });

  describe("Multi-wallet Interaction", function () {
    it("Different wallets can save different moods", async function () {
      await moodMark.connect(addr1).setMood(Mood.Excited);
      await moodMark.connect(addr2).setMood(Mood.Anxious);

      const [addr1Mood, addr1HasMood] = await moodMark.getMood(addr1.address);
      const [addr2Mood, addr2HasMood] = await moodMark.getMood(addr2.address);
      const [, ownerHasMood] = await moodMark.getMood(owner.address);

      expect(addr1HasMood).to.equal(true);
      expect(addr1Mood).to.equal(Mood.Excited);

      expect(addr2HasMood).to.equal(true);
      expect(addr2Mood).to.equal(Mood.Anxious);

      expect(ownerHasMood).to.equal(false);
    });
  });
});
