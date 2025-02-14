const { isValidEthereumAddress } = require('../utils/validators');

const getUserData = (req, res, next) => {
  try {
    const { address } = req.params;
    
    if (!isValidEthereumAddress(address)) {
      return res.status(400).json({
        error: 'Invalid Address',
        message: 'The provided address is not a valid Ethereum address'
      });
    }

    res.json({
      address,
      balance: '1000',
      lastLogin: new Date().toISOString(),
      transactionsCount: 5,
      status: 'active'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserData
}; 