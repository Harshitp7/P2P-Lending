// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract P2pLending {

    struct Borrower {
        address Address;
        string name;
        string image;
        address payable wallet;
        uint annualIncome;
        uint [] madeRequests;
    }

    struct Lender {
        address Address;
        string name;
        string image;
        address payable wallet;
        uint principalAmount;
        uint time;
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

    function SignUpBorrower(address _Address, string memory _name, string memory _password, string memory _role, uint _annualIncome, uint [] memory _madeRequests) public 
    returns (address _Address, string memory _name, string memory _image, address payable _wallet, uint _annualIncome, uint [] memory _madeRequests) 
    {
        require(user[_Address].Address != msg.sender);
        user[_Address].Address = _Address;
        user[_Address].name = _name;
        user[_Address].password = _password;
        user[_Address].role = _role;
        user[_Address].LoggedInStatus = false;
        
        borrowers[_Address].Address = _Address;
        borrowers[_Address].name = _name;
        borrowers[_Address].image = _image;
        borrowers[_Address].wallet = _wallet;
        borrowers[_Address].annualIncome = _annualIncome;
        borrowers[_Address].madeRequests = _madeRequests;

        return
        (
             borrowers[_Address].name,
             borrowers[_Address].image,
             borrowers[_Address].wallet,
             borrowers[_Address].annualIncome,
             borrowers[_Address].madeRequests
        );
    }

    function SignUpLender(address _Address, string memory _name, string memory _password, string memory _role) public 
    returns (address _Address,string memory _name, string memory _image, address payable _wallet, uint _principalAmount, uint _time, uint _interestRate, uint _loanCapacity, uint [] memory _gotRequests) 
    {
        require(user[_Address].Address != msg.sender);
        user[_Address].Address = _Address;
        user[_Address].name = _name;
        user[_Address].password = _password;
        user[_Address].role = _role;
        user[_Address].LoggedInStatus = false;
        
        lenders[lenderIndex[_Address]].Address = _Address;
        lenders[lenderIndex[_Address]].name = _name;
        lenders[lenderIndex[_Address]].image = _image;
        lenders[lenderIndex[_Address]].wallet = _wallet;
        lenders[lenderIndex[_Address]].principalAmount = _principalAmount;
        lenders[lenderIndex[_Address]].time = _time;
        lenders[lenderIndex[_Address]].interestRate = _interestRate;
        lenders[lenderIndex[_Address]].loanCapacity = _loanCapacity;
        lenders[lenderIndex[_Address]].gotRequests = _gotRequests;

        return
        (
            lenders[lenderIndex[_Address]].Address,
            lenders[lenderIndex[_Address]].name,
            lenders[lenderIndex[_Address]].image,
            lenders[lenderIndex[_Address]].wallet,
            lenders[lenderIndex[_Address]].principalAmount,
            lenders[lenderIndex[_Address]].time,
            lenders[lenderIndex[_Address]].interestRate,
            lenders[lenderIndex[_Address]].loanCapacity,
            lenders[lenderIndex[_Address]].gotRequests 
        );
    }

    function logInBorrower(address _Address) public 
    returns (string memory _name, string memory _image, address payable _wallet, uint _annualIncome, uint [] memory _madeRequests)
    {
        if (keccak256(abi.encodePacked(user[_Address].password)) == keccak256(abi.encodePacked(_password))) 
        {
            user[_Address].LoggedInStatus = true;
            return 
            (
             borrowers[_Address].name,
             borrowers[_Address].image,
             borrowers[_Address].wallet,
             borrowers[_Address].annualIncome,
             borrowers[_Address].madeRequests
            );
        } 
        else
        {
            user[_Address].LoggedInStatus = false;
            return ("0","0",0xDccCc7cF793326012916D599AaE1279865E038d7,0,[]);
        }
        
    }

    function logInLender(address _Address) public 
    returns (string memory _name, string memory _image, address payable _wallet, uint _interestRate, uint _loanCapacity, uint [] memory _gotRequests)
    {
        if (keccak256(abi.encodePacked(user[_Address].password)) == keccak256(abi.encodePacked(_password))) 
        {
            user[_Address].LoggedInStatus = true;
            return
            (
                lenders[lenderIndex[_Address]].name,
                lenders[lenderIndex[_Address]].image,
                lenders[lenderIndex[_Address]].wallet,
                lenders[lenderIndex[_Address]].principalAmount,
                lenders[lenderIndex[_Address]].time,
                lenders[lenderIndex[_Address]].interestRate,
                lenders[lenderIndex[_Address]].loanCapacity,
                lenders[lenderIndex[_Address]].gotRequests
            ); 
        }
        else
        {
            user[_Address].LoggedInStatus = false;
            return ("0","0",0xDccCc7cF793326012916D599AaE1279865E038d7,0,0,[]);
        } 
        
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
        borrowers[_from].madeRequests.push(len);
        lenders[lenderIndex[_to]].gotRequests.push(len);
    }

    function getBorrowerRequests (address _borrower) public onlyBorrower view returns(Request [] memory) 
    {
        uint len = borrowers[_borrower].madeRequests.length;
        Request [] memory myReqs = new Request [](len);
        for(uint i = 0; i <len; i++ )
        {
            myReqs[i] = requests[borrowers[_borrower].madeRequests[i]];
        }
        return myReqs;
    }
}