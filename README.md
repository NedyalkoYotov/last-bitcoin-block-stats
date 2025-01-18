# Last Bitcoin Block Stats

A Node.js application that tracks and displays statistics from the latest Bitcoin blockchain blocks.

## Description

This project provides real-time access to Bitcoin blockchain statistics, allowing users to monitor the latest block information including:
- Block height
- Transaction count
- Block size
- Mining difficulty
- Transaction fees
- Timestamp information

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/last-bitcoin-block-stats.git
cd last-bitcoin-block-stats
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:
```env
# Add any required API keys or configuration here
```

## Usage

Start the application:
```bash
npm start
```

## Dependencies

- axios: For making HTTP requests to Bitcoin APIs
- bitcoinjs-lib: Bitcoin JavaScript library
- dotenv: Environment variable management
- web3: Web3 utilities

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.