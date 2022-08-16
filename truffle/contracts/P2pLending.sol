// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract P2pLending {

    struct Borrower {
        string userType;
        string name;
        string image;
        address payable wallet;
        uint annualIncome;
        uint [] madeReqests;
    }

    struct Lender {
        string userType;
        string name;
        string image;
        address payable wallet;
        uint interestRate;
        uint loanCapacity;
        uint [] gotRequests;
    }

    struct userDetails {
        address Address;
        string name;
        string password;
        string role;
        bool LoggedInStatus;
    }

    enum statuses  {
        PENDING,
        ACCEPTED,
        REJECTED,
        DELAYED,
        COMPLETED
    }
      struct Request {
        address from;
        address to;
        uint money;
        uint delayCost;
        statuses status;
        uint duration;
    }

    //  -----------------State variables-------------------------------

    mapping(address => Borrower) borrowers;
    Lender [] public lenders;
    mapping(address => uint) lenderIndex;
    Request [] public requests;
    mapping(address => userDetails) user;

    // ------------------modifiers-----------------

    modifier onlyLender {
        require (msg.sender == lenders[lenderIndex[msg.sender]].wallet, "Access denied");
        _;
    }
    modifier onlyBorrower {
        require (msg.sender == borrowers[msg.sender].wallet, "Access denied");
        _;
    }

    // ------------------functions-----------------

    function SignUpUser(address _Address, string memory _name, string memory _password, string _role) public returns (bool) 
    {
        require(user[_Address].Address != msg.sender);
        user[_Address].Address = _Address;
        user[_Address].name = _name;
        user[_Address].password = _password;
        user[_Address].role = _role;
        user[_Address].LoggedInStatus = false;
        return true;
    }

    function logInUser(address _Address, string memory _password) public returns (bool)
    {
        if (keccak256(abi.encodePacked(user[_Address].password)) == keccak256(abi.encodePacked(_password))) 
        {
            user[_Address].LoggedInStatus = true;
            return user[_Address].LoggedInStatus;
        } 
        else return false;
    }

    function checkUserLoggedInStatus(address _Address) public view returns (bool)
    {
        return user[_Address].LoggedInStatus;
    }

    function logOutUser(address _Address) public {
        user[_Address].LoggedInStatus = false;
    }

    function makeRequest (address _from, address _to, uint _money, uint _duration) public onlyBorrower
    {
        requests.push(Request({
            from : _from,
            to : _to,
            money : _money,
            duration : _duration,
            status : statuses.PENDING,
            delayCost : 0
        }));
        uint len = requests.length - 1;
        borrowers[_from].madeReqests.push(len);
        lenders[lenderIndex[_to]].gotRequests.push(len);
    }

    function getBorrowerRequests (address _borrower) public onlyBorrower view returns(Request [] memory) 
    {
        uint len = borrowers[_borrower].madeReqests.length;
        Request [] memory myReqs = new Request [](len);
        for(uint i = 0; i <len; i++ )
        {
            myReqs[i] = requests[borrowers[_borrower].madeReqests[i]];
        }
        return myReqs;
    }
}