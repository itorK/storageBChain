pragma solidity ^0.4.0;

contract Documents {

    address public owner;

    enum State {
    Inactive,
    Active
    }

    struct Hash {
    bytes32 hash;
    uint32 clientId;
    }

    mapping (uint32 => Hash) hashes;
    State public state;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier contractActive() {
        require(state == State.Active);
        _;
    }

    function Documents () public {
        owner = msg.sender;
        state = State.Active;
    }

    function deactivate() public onlyOwner() {
        state = State.Inactive;
    }

    function activate() public onlyOwner() {
        state = State.Active;
    }

    function getHash(uint32 docId, uint32 clientId) public view contractActive() returns(bytes32) {
        if(hashes[docId].clientId == clientId) {
            return hashes[docId].hash;
        } else {
            return 0;
        }
    }

    function addHash(uint32 clientId, bytes32 documentHash, uint32 docId) public onlyOwner() contractActive() {
        var hashnew = Hash(documentHash, clientId);
        hashes[docId] = hashnew;
    }

    function changeOwner(address _newOwner) public onlyOwner() {
        owner = _newOwner;
    }

}
