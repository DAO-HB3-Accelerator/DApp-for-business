import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const provider = ethers.provider;

    try {
        if (!provider) {
            throw new Error("Provider is undefined. Check Hardhat network configuration.");
        }

        const balance = await provider.getBalance(deployer.address);

        if (!balance) {
            throw new Error("Unable to fetch balance. Check RPC configuration.");
        }

        console.log("Raw balance object:", balance);

        // Форматирование баланса
        const formattedBalance = `${ethers.formatEther(balance)} ETH`;
        console.log("Account balance:", formattedBalance);

        // Проверка минимального баланса
        const minimumBalance = ethers.parseEther("0.01");
        if (balance < minimumBalance) {
            throw new Error("Insufficient balance for deployment.");
        }

        // Разворачивание контракта
        const initialSupply = ethers.parseUnits("1000000", 18);
        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(initialSupply);

        // Ожидание завершения деплоя
        await token.deploymentTransaction().wait();
        console.log("Token deployed to:", token.target); // В ethers 6.x используется `target` вместо `address`
    } catch (error) {
        console.error("Error during deployment:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Main error:", error);
        process.exitCode = 1;
    });
