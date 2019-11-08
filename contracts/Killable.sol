pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
 * @dev Contract module which create contract with `Mortal` state that make
 * it available to destroy it self with `suicide` function. Also contract owner
 * can make it `Immortal` and suicide function will be always rejected.
 *
 * Killable contract is inherit from Open Zeppelin `Ownable` Contract that
 * provide basic access control mechanism.
 *
 * This module is used through inheritance. It will make available the modifier
 * `isImmortal`, which can be applied to your functions to restrict is contract Mortal
 *  or not.
 */
contract Killable is Ownable {
  // Private bool var that tell is Contract.
  bool private _immortal;

  // event that fire when Contract became `Immortal`.
  event Immortality(bool immortal);

  /**
  * @dev Initializes the contract. Inherit constructor from parent.
  */
  constructor() public Ownable() {

  }

  /**
  * @dev Throws if Contract is 'Immortal' or
  * if called by any account other than the owner.
  */
  modifier onlyMortal() {
    require(isOwner(), "Ownable: caller is not the owner");
    require(!isImmortal(), "Killable: contract is Immortal!");
    _;
  }

  /**
  * @dev Returns true if Contract is 'Immortal'.
  */
  function isImmortal() public view returns (bool) {
    return _immortal;
  }

  /**
  * @dev Make contract `Immortal`
  */
  function makeImmortal() public onlyMortal {
    _immortal = true;
    emit Immortality(true);
  }

  /**
  * @dev Kill Contract.
  * It can be call only from Contract Owner for `Mortal` Contract.
  */
  function _suicide() external onlyMortal {
    selfdestruct(msg.sender);
  }
}
