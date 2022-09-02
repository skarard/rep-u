// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract SecureStorage {
    error NotSigner();

    address private _signer;
    mapping(address => bytes32) private _roots;

    constructor(address signer_) {
        _signer = signer_;
    }

    modifier onlySigner() {
        if (msg.sender != _signer) revert NotSigner();

        _;
    }

    function setRoot(bytes32 root_) public onlySigner {
        _roots[msg.sender] = root_;
    }

    function getRoot(address user_) public view returns (bytes32) {
        return _roots[user_];
    }

    function validate(
        address user_,
        bytes32[] calldata proof_,
        bytes32 question_
    ) public view returns (bool) {
        return
            MerkleProof.verifyCalldata(
                proof_,
                _roots[user_],
                keccak256(abi.encodePacked(msg.sender, question_))
            );
    }
}
