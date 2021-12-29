pragma solidity >=0.4.21 <0.9.0;

contract Contacts{
    // this is state variable and whatever we write here will be stored in blockchain
    uint public count =0;

    struct Contact{
        uint id;
        string name;
        string phone;
    }

    constructor() public {
        createContact("David T Zirima",'123123');

    }
    mapping(uint =>Contact) public contacts;

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count,_name,_phone);
    }

}
