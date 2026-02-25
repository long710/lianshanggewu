const { ethers } = require("ethers");

/**
 * 根据助记词和BIP-44路径生成钱包信息
 * @param {string} mnemonic - 12位助记词
 * @param {number} accountIndex - 账户索引 (默认为0)
 * @param {number} addressIndex - 地址索引 (默认为0)
 */
function generateWalletFromMnemonic(mnemonic, accountIndex = 0, addressIndex = 0) {
    try {
        // 校验助记词是否有效
        if (!ethers.Mnemonic.isValidMnemonic(mnemonic)) {
            throw new Error("无效的助记词");
        }

        // --- 配置 BIP-44 参数 ---
        // 标准以太坊路径格式: m / 44' / 60' / account' / change / address_index
        // 44' : BIP-44 规范
        // 60' : 以太坊 coin type
        // 0   : change (0 代表外部链，1 代表内部/找零)
        const path = `m/44'/60'/${accountIndex}'/0/${addressIndex}`;

        // 通过助记词和路径创建 HD 钱包实例
        // 第二个参数是 passphrase（盐），通常留空 ""
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, "", path);

        console.log(`\n--- 配置参数 ---`);
        console.log(`路径 (Path): ${path}`);

        console.log(`\n--- 钱包信息 ---`);
        console.log(`地址 (Address):     ${wallet.address}`);
        console.log(`私钥 (Private Key): ${wallet.privateKey}`);

        return wallet;

    } catch (error) {
        console.error("生成失败:", error.message);
    }
}

// ================= 使用示例 =================

// 1. 这是一个测试用的12位助记词 (切勿在主网使用!)
const sampleMnemonic = "section lonely feed limit story write cannon aunt energy glow empty century";
//0x023fbba7e51fbb60a8d6dd59125ce14600b40d7a
//0x023fbba7e51fbb60a8d6dd59125ce14600b40d7a
//0x71883a683376Cf9Ce717e154699E8D87c547B026

// 2. 生成默认第一个地址 (m/44'/60'/0'/0/0)
// 这是 MetaMask 等钱包默认显示的第一个账户
generateWalletFromMnemonic(sampleMnemonic, 0, 1);

// 3. 生成第二个账户 (m/44'/60'/0'/0/1)
// 比如你在 MetaMask 点击 "创建账户" 时生成的第二个地址
// generateWalletFromMnemonic(sampleMnemonic, 0, 1);