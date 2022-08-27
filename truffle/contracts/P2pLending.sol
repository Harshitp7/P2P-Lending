// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract P2pLending {

   struct Borrower {
        string userType;
        string name;
        string image;
        address payable wallet;
        bytes32 password;
        uint annualIncome;
        uint [] madeRequests;
    }

    struct Lender {
        string userType;
        string name;
        string image;
        address payable wallet;
        bytes32 password;
        uint interestRate;
        uint maxPrincipal;
        uint [] gotRequests;
    }

    enum statuses  {
        PENDING,
        ACCEPTED,
        REJECTED,
        DELAYED,
        COMPLETED
    }
      struct Request {
        uint id;
        address from;
        address to;
        uint amount;
        statuses status;
        uint duration;
        string purpose;
        string bankStatement;
        uint createdAt;
    }

    //  -----------------State variables-------------------------------

    mapping(address => Borrower) public borrowers;
    Lender [] public lenders;
    mapping(address => uint) lenderIndex;
    Request [] public requests;
    mapping(address => string) public users;
    mapping(address => mapping(address => Request)) public borrowRequests;

    // ------------------modifiers-----------------

    modifier onlyLender {
        require (msg.sender == lenders[lenderIndex[msg.sender]].wallet, "Access denied");
        _;
    }
    modifier onlyBorrower {
        require (msg.sender == borrowers[msg.sender].wallet, "Access denied");
        _;
    }

    // ------------------functions-----------------------------------


    function getRole () public view returns (string memory) {
            return users[msg.sender];
    }

    function signUpBorrower (string memory _name, string memory _image, string memory _password, uint _annualIncome) public {
        require(keccak256(abi.encodePacked(users[msg.sender])) == keccak256(abi.encodePacked("")), "This address is already registered");

        borrowers[msg.sender] = Borrower({
            userType: "Borrower",
            name: _name,
            image: _image,
            wallet: payable(msg.sender),
            password: keccak256(abi.encodePacked(_password)),
            annualIncome: _annualIncome,
            madeRequests: new uint[](0)
        });
        users[msg.sender] = "Borrower";
    }

    function signUpLender (string memory _name, string memory _image, string memory _password, uint _interestRate, uint _maxPrincipal) public {
        require(keccak256(abi.encodePacked(users[msg.sender])) == keccak256(abi.encodePacked("")), "This address is already registered");

        lenders.push(Lender({
            userType: "Lender",
            name: _name,
            image: _image,
            wallet: payable (msg.sender),
            password: keccak256(abi.encodePacked(_password)),
            interestRate: _interestRate,
            maxPrincipal: _maxPrincipal,
            gotRequests: new uint[](0)
        }));
        lenderIndex[msg.sender] = lenders.length - 1;
        users[msg.sender] = "Lender";
    }

    // returns (Borrower memory) { 
    function signInBorrower (string memory _password) public view 
    returns (string memory userType, string memory name, string memory image, address wallet, uint annualIncome, uint[] memory madeReqests) {
        require(keccak256(abi.encodePacked(users[msg.sender])) == keccak256(abi.encodePacked("Borrower")), "User not found");
        require (borrowers[msg.sender].password == keccak256(abi.encodePacked(_password)), "Invalid password");
        
        return (
            borrowers[msg.sender].userType,
            borrowers[msg.sender].name,
            borrowers[msg.sender].image,
            borrowers[msg.sender].wallet,
            borrowers[msg.sender].annualIncome,
            borrowers[msg.sender].madeRequests
            // add rest fields
        );
        // return borrowers[msg.sender];
    }

    // returns (Lender memory) {
    function signInLender (string memory _password) public view  
    returns (string memory userType, string memory name, string memory image, address wallet, uint interestRate, uint maxPrincipal, uint[] memory gotRequests) {
        require(keccak256(abi.encodePacked(users[msg.sender])) == keccak256(abi.encodePacked("Lender")), "User not found");
        require (lenders[lenderIndex[msg.sender]].password == keccak256(abi.encodePacked(_password)), "Invalid password");
        
        return (
            lenders[lenderIndex[msg.sender]].userType,
            lenders[lenderIndex[msg.sender]].name,
            lenders[lenderIndex[msg.sender]].image,
            lenders[lenderIndex[msg.sender]].wallet,
            lenders[lenderIndex[msg.sender]].interestRate,
            lenders[lenderIndex[msg.sender]].maxPrincipal,
            lenders[lenderIndex[msg.sender]].gotRequests
        );
        // return lenders[lenderIndex[msg.sender]];
    }



    function getLenders () public view returns (Lender[] memory) {
        return lenders;
    }

    function getLender (address _wallet) public view returns (Lender memory) {
        return lenders[lenderIndex[_wallet]];
    }

    function createRequest (address _from, address _to, uint amount, uint _duration, string memory _purpose, string memory _bankStatement) public onlyBorrower
    {
        Request memory newRequest = Request({
            id: requests.length,
            from : _from,
            to : _to,
            amount : amount,
            duration : _duration,
            status : statuses.PENDING,
            purpose : _purpose,
            createdAt : block.timestamp,
            bankStatement : _bankStatement
        });
        requests.push(newRequest);
        borrowRequests[_from][_to] = newRequest;
        uint len = requests.length - 1;
        borrowers[_from].madeRequests.push(len);
        lenders[lenderIndex[_to]].gotRequests.push(len);
    }

    function getBorrowerRequests () public onlyBorrower view returns(Request [] memory) 
    {
        uint len = borrowers[msg.sender].madeRequests.length;
        Request [] memory myReqs = new Request [](len);
        for(uint i = 0; i <len; i++ )
        {
            myReqs[i] = requests[borrowers[msg.sender].madeRequests[i]];
        }
        return myReqs;
    }

    function updateBorrower (string memory _name, string memory _image, uint _annualIncome) public onlyBorrower
    {
         borrowers[msg.sender].name = _name;
         borrowers[msg.sender].image = _image;
         borrowers[msg.sender].annualIncome = _annualIncome;
    }

    function updateLender (string memory _name, string memory _image, uint _interestRate, uint _maxPrincipal) 
    public onlyLender
    {
       lenders[lenderIndex[msg.sender]].name = _name;
       lenders[lenderIndex[msg.sender]].image = _image;
       lenders[lenderIndex[msg.sender]].interestRate = _interestRate;
       lenders[lenderIndex[msg.sender]].maxPrincipal = _maxPrincipal;
    }
    
    function calculatePaybackCost (address _from, address _to) public view
    returns (uint originalAmount,uint totalAmount) 
    {
        uint principalAmount = borrowRequests[_from][_to].amount;
        uint rate = lenders[lenderIndex[_to]].interestRate;
        uint time = borrowRequests[_from][_to].duration;
        uint _createdAt = borrowRequests[_from][_to].createdAt;

        uint interest = (principalAmount*rate*time)/1200;
        
        originalAmount = (principalAmount + interest);
        uint unitAmount = originalAmount/time;
        if(block.timestamp > time + _createdAt)
        {
            uint delayTime = block.timestamp - (time + _createdAt);
            uint delayAmount = ((unitAmount*(delayTime))*5)/4; 
            totalAmount = originalAmount + delayAmount;

            return (originalAmount, totalAmount);
        }
        else
        {
            totalAmount = originalAmount;
            return (originalAmount, totalAmount);
        }
    }
   
    //  function payBack (address payable _to) public payable
    
    //     (bool sent, bytes memory data) = _to.call{value: msg.value}("");
    //      require(sent, "Failed to send Ether");
    //  }
}

