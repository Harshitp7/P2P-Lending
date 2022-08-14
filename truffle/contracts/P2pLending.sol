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