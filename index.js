// 引入所需模块
const express = require('express');
const Web3 = require('web3');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { ethers } = require('ethers');

// 初始化环境变量
dotenv.config();

// 设置Express应用
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 初始化Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

// 示例智能合约配置
const contractAddress = '0xYourContractAddress';
const contractABI = [{
    "constant": true,
    "inputs": [],
    "name": "yourMethodName",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}];

// 创建智能合约实例
const contract = new web3.eth.Contract(contractABI, contractAddress);

// API路由
app.get('/api/data', async (req, res) => {
    try {
        const data = await contract.methods.yourMethodName().call();
        res.json({ result: data });
    } catch (error) {
        console.error('Error accessing the smart contract:', error);
        res.status(500).send('Server error');
    }
});

// 另一个例子：以太坊当前区块号
app.get('/api/blockNumber', async (req, res) => {
    try {
        const blockNumber = await provider.getBlockNumber();
        res.json({ currentBlockNumber: blockNumber });
    } catch (error) {
        console.error('Error getting the current block number:', error);
        res.status(500).send('Server error');
    }
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
