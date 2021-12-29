const Contacts = artifacts.require('./contacts.sol')

module.exports = function(deployer) {
  deployer.deploy(Contacts);
};
