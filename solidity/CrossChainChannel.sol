// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

contract SafeMath {
    function safeAdd(uint x, uint y)
        internal
        pure
    returns(uint) {
        uint256 z = x + y;
        require((z >= x) && (z >= y));
        return z;
    }

    function safeSub(uint x, uint y)
        internal
        pure
    returns(uint) {
        require(x >= y);
        uint256 z = x - y;
        return z;
    }

    function safeMul(uint x, uint y)
        internal
        pure
    returns(uint) {
        uint z = x * y;
        require((x == 0) || (z / x == y));
        return z;
    }
    
    function safeDiv(uint x, uint y)
        internal
        pure
    returns(uint) {
        require(y > 0);
        return x / y;
    }

    function random(uint N, uint salt)
        internal
        view
    returns(uint) {
        bytes32 hash = keccak256(abi.encodePacked(block.number, msg.sender, salt));
        return uint(hash) % N;
    }
}

contract Authorization {
    mapping(address => address) public agentBooks;
    address public owner;
    address public operator;
    address public bank;
    bool public powerStatus = true;

    constructor()
        public
    {
        owner = msg.sender;
        operator = msg.sender;
        bank = msg.sender;
    }

    modifier onlyOwner
    {
        assert(msg.sender == owner);
        _;
    }
    modifier onlyOperator
    {
        assert(msg.sender == operator || msg.sender == owner);
        _;
    }
    modifier onlyActive
    {
        assert(powerStatus);
        _;
    }

    function powerSwitch(
        bool onOff_
    )
        public
        onlyOperator
    {
        powerStatus = onOff_;
    }

    function transferOwnership(address newOwner_)
        onlyOwner
        public
    {
        owner = newOwner_;
    }
    
    function assignOperator(address user_)
        public
        onlyOwner
    {
        operator = user_;
        agentBooks[bank] = user_;
    }
    
    function assignBank(address bank_)
        public
        onlyOwner
    {
        bank = bank_;
    }

    function assignAgent(
        address agent_
    )
        public
    {
        agentBooks[msg.sender] = agent_;
    }

    function isRepresentor(
        address representor_
    )
        public
        view
    returns(bool) {
        return agentBooks[representor_] == msg.sender;
    }

    function getUser(
        address representor_
    )
        internal
        view
    returns(address) {
        return isRepresentor(representor_) ? representor_ : msg.sender;
    }
}

contract StandardToken is SafeMath {
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
    uint256 public decimals;
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event Issue(address indexed _to, uint256 indexed _value);
    event Burn(address indexed _from, uint256 indexed _value);

    /* constructor */
    constructor() public payable {}

    /* Send coins */
    function transfer(
        address to_,
        uint256 amount_
    )
        public
    returns(bool success) {
        if(balances[msg.sender] >= amount_ && amount_ > 0) {
            balances[msg.sender] = safeSub(balances[msg.sender], amount_);
            balances[to_] = safeAdd(balances[to_], amount_);
            emit Transfer(msg.sender, to_, amount_);
            return true;
        } else {
            return false;
        }
    }

    /* A contract attempts to get the coins */
    function transferFrom(
        address from_,
        address to_,
        uint256 amount_
    ) public returns(bool success) {
        if(balances[from_] >= amount_ && allowed[from_][msg.sender] >= amount_ && amount_ > 0) {
            balances[to_] = safeAdd(balances[to_], amount_);
            balances[from_] = safeSub(balances[from_], amount_);
            allowed[from_][msg.sender] = safeSub(allowed[from_][msg.sender], amount_);
            emit Transfer(from_, to_, amount_);
            return true;
        } else {
            return false;
        }
    }

    function balanceOf(
        address _owner
    )
        view
        public
    returns (uint256 balance) {
        return balances[_owner];
    }

    /* Allow another contract to spend some tokens in your behalf */
    function approve(
        address _spender,
        uint256 _value
    )
        public
    returns (bool success) {
        assert((_value == 0) || (allowed[msg.sender][_spender] == 0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) view public returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}

contract WarrantToken is StandardToken, Authorization {
    // metadata
    string public version = "1.0";
    string public name;
    string public symbol;

    // constructor
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 decimals_
    )
        payable
        public
    {
        owner = msg.sender;
        totalSupply = 0;
        name = name_;
        symbol = symbol_;
        decimals = decimals_;
    }

    function mint(
        address user_,
        uint256 amount_
    )
        external
        onlyOwner
    returns(bool success) {
        if(amount_ > 0 && user_ != address(0)) {
            totalSupply = safeAdd(totalSupply, amount_);
            balances[user_] = safeAdd(balances[user_], amount_);
            emit Issue(address(0), amount_);
            emit Transfer(address(0), user_, amount_);
            return true;
        }
    }

    function burn(
        uint256 amount_
    )
        external
    returns(bool success) {
        if(amount_ > 0 && balances[msg.sender] >= amount_) {
            balances[msg.sender] = safeSub(balances[msg.sender], amount_);
            totalSupply = safeSub(totalSupply, amount_);
            emit Transfer(msg.sender, address(0), amount_);
            emit Burn(address(0), amount_);
            return true;
        }
    }
    
    function getDecimals()
        view
        public
    returns(uint256 _decimals) {
        return decimals;
    }
}

contract CrossChainChannel is SafeMath, Authorization {
    address[] public assetList;
    mapping(address => address) public warrantList;
    
    event Support(address indexed _asset);
    event Switch(address indexed _asset, bool indexed onOff);
    event Teleport(address indexed _user, address indexed _asset, uint256 indexed _amount, bool _direct);

    /* constructor */
    constructor() public payable {}

    /* Operator Function
        function support(address token) external onlyOperator;
    */

    /* External Function
        function fallback() external payable;
        function receive() external payable;
        function teleport() external payable; ETH tunnel
        function teleport(address token, uint256 amount, address receiver) external; ERC20 tunnel
    */
    /* View
        function isSupport(address token) returns(bool);
        function supportedAsset(uint256 index) returns(address);
        function warrantOf(address token) returns(address);
    */
    
    /* Internal Funtion
    */
    
    fallback() external payable {}
    receive()
        external
        payable
    {
        if(msg.value > 0) {
            this.teleport();
        }
    }

    function support(
        address token_,
        string memory name_,
        string memory symbol_,
        uint256 decimals_
    )
        external
        onlyOperator
    {
        assetList.push(token_);
        warrantList[token_] = address(new WarrantToken(name_, symbol_, decimals_));
    }

    function teleport()
        external
        payable
    {
        require(msg.value > 0);
        address user = msg.sender;
        address asset = address(0);
        uint256 amount = msg.value;
        WarrantToken(warrantList[asset]).mint(user, amount);
        Teleport(user, asset, amount, true);
    }
}