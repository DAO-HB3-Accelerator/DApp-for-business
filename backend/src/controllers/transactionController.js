const { isValidEthereumAddress } = require('../utils/validators');

const getTransactions = (req, res, next) => {
  try {
    const { address } = req.params;
    
    if (!isValidEthereumAddress(address)) {
      return res.status(400).json({
        error: 'Invalid Address',
        message: 'The provided address is not a valid Ethereum address'
      });
    }

    res.json([
      {
        id: 1,
        type: 'transfer',
        amount: '100',
        timestamp: new Date().toISOString(),
        from: address,
        to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        status: 'completed'
      },
      {
        id: 2,
        type: 'receive',
        amount: '50',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        to: address,
        status: 'completed'
      }
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTransactions
}; 