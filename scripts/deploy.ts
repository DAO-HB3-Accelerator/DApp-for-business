import { ethers } from "hardhat";
import { verify } from "@nomicfoundation/hardhat-verify";

async function main() {
    try {
        const [deployer] = await ethers.getSigners();
        console.log("Deploying contracts with account:", deployer.address);

        const provider = ethers.provider;
        if (!provider) {
            throw new Error("Provider is undefined");
        }

        // Получаем информацию о сети
        const network = await provider.getNetwork();
        console.log("Network:", {
            name: network.name,
            chainId: network.chainId
        });

        // Получаем информацию о газе
        const feeData = await provider.getFeeData();
        console.log("Current gas price:", ethers.formatUnits(feeData.gasPrice || 0, "gwei"), "gwei");

        const balance = await provider.getBalance(deployer.address);
        console.log("Account balance:", ethers.formatEther(balance), "ETH");

        // Проверка минимального баланса
        const minimumBalance = ethers.parseEther("0.01");
        if (balance < minimumBalance) {
            throw new Error("Insufficient balance for deployment");
        }

        // Деплой контракта
        const initialSupply = ethers.parseUnits("1000000", 18);
        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(initialSupply);

        console.log("Deploying token...");
        const deployment = await token.deploymentTransaction();
        if (!deployment) {
            throw new Error("Deployment transaction failed");
        }

        console.log("Waiting for deployment...");
        await deployment.wait(1);
        
        console.log("Token deployed to:", token.target);

        // Верификация контракта
        if (process.env.ETHERSCAN_API_KEY) {
            console.log("Waiting for 6 block confirmations for verification...");
            await deployment.wait(6);

            console.log("Verifying contract...");
            await verify(token.target, [initialSupply]);
            console.log("Contract verified successfully");
        }

        return { success: true, address: token.target };
    } catch (error) {
        console.error("Deployment failed:", error);
        return { success: false, error };
    }
}

main()
    .then((result) => {
        if (result.success) {
            process.exit(0);
        } else {
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
