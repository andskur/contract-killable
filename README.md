# Killable solidity smart-contract

Contract module which create contract with `Mortal` state that make it available to destroy it
self with `suicide` function. Also contract owner
can make it `Immortal` and suicide function will be always rejected.

Killable contract is inherit from Open Zeppelin `Ownable` Contract that
provide basic access control mechanism.

This module is used through inheritance. It will make available the modifier
`isImmortal`, which can be applied to your functions to restrict is contract Mortal or not.

## License

Killable is released under [the MIT License](https://github.com/andskur/contract-killable/blob/master/LICENSE).

Solidity is licensed under [GNU General Public License v3.0.](https://github.com/ethereum/solidity/blob/develop/LICENSE.txt)

Third-party is licensed under its [own licensing terms.](https://github.com/ethereum/solidity/blob/develop/cmake/templates/license.h.in)
