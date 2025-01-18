require('dotenv').config();
const axios = require('axios');

// Bitcoin node RPC configuration
const BTC_NODE_URL = process.env.BTC_NODE_URL || 'https://mempool.space/api';

class BlockchainTracker {
    constructor() {
        this.lastProcessedBlock = null;
    }

    async initialize() {
        try {
            const response = await axios.get(`${BTC_NODE_URL}/blocks/tip/hash`);
            this.lastProcessedBlock = response.data;
            
            const block = await this.getBlockDetails(this.lastProcessedBlock);
            this.printBlockInfo(block);
            
            return block.height;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    printBlockInfo(block) {
        console.log('\nBlock Information:');
        console.log('-------------------');
        console.log('Hash:', block.id);
        console.log('Height:', block.height);
        console.log('Timestamp:', new Date(block.timestamp * 1000).toLocaleString());
        console.log('Size:', (block.size / 1024).toFixed(2), 'KB');
        console.log('Weight:', (block.weight / 1024).toFixed(2), 'KWU');
        console.log('Total transactions:', block.tx.length);
        console.log('Difficulty:', block.difficulty);
        console.log('Nonce:', block.nonce);
        
        // Calculate block metrics
        const blockReward = 6.25; // Current block reward in BTC
        console.log('\nBlock Metrics:');
        console.log('-------------------');
        console.log('Block reward:', blockReward, 'BTC');
        console.log('Average transactions per second:', (block.tx.length / 600).toFixed(2)); // 600 seconds = 10 minutes
        console.log('Average size per transaction:', (block.size / block.tx.length).toFixed(2), 'bytes');
        
        // Block efficiency metrics
        const blockSizeLimit = 4000000; // 4MB block size limit
        const utilizationPercent = ((block.size / blockSizeLimit) * 100).toFixed(2);
        console.log('Block space utilization:', utilizationPercent + '%');
    }

    async getBlockDetails(blockHash) {
        try {
            // Get full block details
            const blockResponse = await axios.get(`${BTC_NODE_URL}/block/${blockHash}`);
            const block = blockResponse.data;

            // Get transaction IDs
            const txResponse = await axios.get(`${BTC_NODE_URL}/block/${blockHash}/txids`);
            
            return {
                id: block.id,
                height: block.height,
                timestamp: block.timestamp,
                size: block.size,
                weight: block.weight,
                tx: txResponse.data,
                version: block.version,
                merkle_root: block.merkle_root,
                nonce: block.nonce,
                bits: block.bits,
                difficulty: block.difficulty
            };
        } catch (error) {
            console.error('Error getting block details:', error.message);
            throw error;
        }
    }

    async start() {
        try {
            let currentHeight = await this.initialize();
            
            setInterval(async () => {
                try {
                    const response = await axios.get(`${BTC_NODE_URL}/blocks/tip/hash`);
                    const latestBlock = await this.getBlockDetails(response.data);
                    
                    if (latestBlock.height > currentHeight) {
                        this.printBlockInfo(latestBlock);
                        currentHeight = latestBlock.height;
                    }
                } catch (error) {
                    console.error('Error checking new block:', error.message);
                }
            }, 60000); // Check every minute
            
            console.log('\nTracking new blocks...');
            
        } catch (error) {
            console.error('Error starting tracker:', error);
            throw error;
        }
    }
}

module.exports = BlockchainTracker; 