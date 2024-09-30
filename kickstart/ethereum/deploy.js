const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
    "REPLACE_WITH_YOUR_MNEMONIC",   // remember to change this to your own phrase!
    
    "https://sepolia.infura.io/v3/46961de91111468a8c828fbf5be3d753"   // remember to change this to your own endpoint!

);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log("Attempting to deploy from account", accounts[0]);

        const result = await new web3.eth.Contract(
            JSON.parse(compiledFactory.interface)
        )
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: "1000000", from: accounts[0] });

        console.log("Contract deployed to", result.options.address);
    } catch (error) {
        // Log the error details
        console.error("Error occurred during contract deployment:", error);
    } finally {
        provider.engine.stop(); // Always stop the provider engine
    }
};

deploy();
