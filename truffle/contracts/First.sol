// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract First {
    string  name;
    string public name2 = "Hello";
    uint public age = 10;

    constructor()  {
        name = "Hello World";
    }

    function getName() public view returns(string memory) {
        return name;
    }
    function getAge() public view returns(uint) {
        return 10*age;
    }
}
 
