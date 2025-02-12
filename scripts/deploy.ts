import { ethers, run } from "hardhat"; // Импортируем ethers и run
import { MyToken__factory } from "../typechain-types"; // Импортируйте фабрику вашего контракта

async function main() {
    try {
        const [deployer] = await ethers.getSigners(); // Получаем аккаунт
        console.log("Deploying contracts with account:", deployer.address);

        const provider = ethers.provider; // Получаем провайдер
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
        console.log("Fee data:", feeData);
        // Если gasPrice отсутствует, используем maxFeePerGas как альтернативу (для сетей с EIP-1559)
        const gasPrice = feeData.gasPrice || feeData.maxFeePerGas;
        const formattedGasPrice = gasPrice ? ethers.formatUnits(gasPrice, "gwei") : "неизвестно";
        console.log("Current gas price:", formattedGasPrice, "gwei");

        // Получаем баланс (уже возвращается BigNumber)
        const balance = await provider.getBalance(deployer.address);
        console.log("Account balance:", balance.toString());

        // Проверка минимального баланса
        const minimumBalance = ethers.parseEther("0.01");
        console.log("Minimum balance required (formatted):", ethers.formatEther(minimumBalance), "ETH");

        if (balance < minimumBalance) { // Теперь balance является BigInt
            throw new Error("Insufficient balance for deployment");
        }

        // Деплой контракта
        const initialSupply = ethers.parseUnits("1000", 18); // 1000 токенов с 18 десятичными знаками
        console.log("Deploying contract...");
        const token = await new MyToken__factory(deployer).deploy(initialSupply);
        console.log("Contract deployed at address:", token.target);

        // Верификация контракта
        if (process.env.ETHERSCAN_API_KEY) {
            console.log("Waiting for 6 block confirmations for verification...");
            const deployTx = token.deploymentTransaction();
            if (!deployTx) {
                throw new Error("Deployment transaction is null or undefined");
            }
            const receipt = await deployTx.wait(6);

            if (receipt) {
                console.log("Verifying contract...");
                await run("verify:verify", {
                    address: token.target,
                    constructorArguments: [initialSupply],
                });
                console.log("Contract verified successfully");
            } else {
                console.error("Failed to get transaction receipt");
            }
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
