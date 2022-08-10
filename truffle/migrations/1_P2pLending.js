const P2pLending = artifacts.require("P2pLending");

module.exports = function (deployer) {
  deployer.deploy(P2pLending);
};