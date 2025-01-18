const BlockchainTracker = require('./tracker');

async function main() {
    const tracker = new BlockchainTracker();
    try {
        await tracker.start();
    } catch (error) {
        console.error('Error starting tracker:', error);
        process.exit(1);
    }
}

main(); 