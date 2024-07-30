async function transferETH() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 请求连接到钱包
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // 创建以太坊提供者和签名者
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            // 获取收款地址和转账数量
            const recipientAddress = document.getElementById('address').value;
            const amount = document.getElementById('amount').value;
            const amountInEther = ethers.utils.parseEther(amount); // 转换为ether
            
            // 发送ETH转账交易
            const tx = await signer.sendTransaction({
                to: recipientAddress,
                value: amountInEther
            });
            await tx.wait();
            
            // 更新按钮文本
            document.getElementById('nextButton').innerText = '转账成功';
        } catch (error) {
            console.error(error);
            document.getElementById('nextButton').innerText = '转账失败请重试';
        }
    } else {
        alert('请安装以太坊钱包插件');
    }
}
