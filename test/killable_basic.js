var Killable = artifacts.require("Killable");

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
expect = chai.expect;

contract("Killable Basic Test", async accounts => {
  before(async () => {
    instance = await Killable.new();
  });

  it('1. Check if the owner is current owner.', async () => {
    const owner = accounts[0];
    let tokenOwner = await instance.owner();
    expect(tokenOwner).to.be.equal(owner);
  });

  it('2. Check if the another address is not the owner.', async () => {
    const address = accounts[1];
    let tokenOwner = await instance.owner();
    expect(tokenOwner).to.not.equal(address);
  });

  it("3. Check if created contact is mortal.", async () => {
    let immortal = await instance.isImmortal();
    expect(immortal).to.be.equal(false);
  });

  it("4. Contract Suicide from not owner address. Should be rejected.", async () => {
    await expect(instance._suicide({ from: accounts[2] })).to.be.eventually.rejected;
  });

  it("5. Try to make contract immortal from not owner address. Should be rejected.", async () => {
    await expect(instance.makeImmortal({ from: accounts[2] })).to.be.eventually.rejected;
  });

  it("6. Contract Suicide from owner. Should be accepted.", async () => {
    await expect(instance._suicide()).to.be.eventually.fulfilled;
  });

  it("7. Get owner from dead contract. Should be rejected.", async () => {
    await expect(instance.owner()).to.be.eventually.rejected;
  });

  it("8. Create new contract, make it Immortal and check it", async () => {
    instance = await Killable.new();
    await expect(instance.makeImmortal()).to.be.eventually.fulfilled;
    let immortal = await instance.isImmortal();
    expect(immortal).to.be.equal(true);
  });

  it("9. Try to make immortal contract immortal again. Should be rejected", async () => {
    await expect(instance.makeImmortal()).to.be.eventually.rejected;
  });

  it("6. Immortal Contract Suicide. Should be rejected.", async () => {
    await expect(instance._suicide()).to.be.eventually.rejected;
  });
});
