// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract First {
    string  name;
    string public name2 = "Hello";
    uint public age = 10;

    struct Test {
        string name;
        uint age;
    }
    Test [] public tests;
    constructor()  {
        name = "Hello World";
        tests.push(Test({name: "Hello", age: 10}));
        tests.push(Test({name: "Hello2", age: 20}));
    }

    function getTests() public view returns (Test [] memory) {
        return tests;
    }
    function getName() public view returns(string memory) {
        return name;
    }
    function getAge() public view returns(uint) {
        return 10*age;
    }
}
 
