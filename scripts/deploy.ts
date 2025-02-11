import { ethers } from "hardhat";
import { run } from "hardhat"; // Импортируем run, а не verify

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
        console.log("Current gas price:", (feeData.gasPrice ? ethers.getDefaultProvider().formatUnits(feeData.gasPrice, "gwei") : "неизвестно"), "gwei");

        const balance = await provider.getBalance(deployer.address);
        console.log("Account balance:", ethers.getDefaultProvider().formatEther(balance), "ETH");
        // Проверка минимального баланса
        const minimumBalance = ethers.utils.parseEther("0.01");
        if (balance.lt(minimumBalance.toString())) { // Приводим minimumBalance к строке для сравнения
            throw new Error("Insufficient balance for deployment");
        }

        // Деплой контракта
        const initialSupply = ethers.utils.parseUnits("1000000", 18);
        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(initialSupply);

        console.log("Deploying token...");
        // Ожидаем завершения деплоя
        await token.deployed(); // вызываем метод deployed для ожидания завершения
        console.log("Token deployed to:", token.address);

        // Верификация контракта
        if (process.env.ETHERSCAN_API_KEY) {
            console.log("Waiting for 6 block confirmations for verification...");
            const receipt = await token.deployTransaction.wait(6).then((receipt) => {
                return receipt;
            }).catch((error: any) => {
                console.error("Error waiting for transaction confirmation:", error);
                return null;
            }); // ждем еще 6 блоков для подтверждения

            if (receipt) {
                console.log("Verifying contract...");
                await run("verify:verify", {
                    address: token.address,
                    constructorArguments: [initialSupply],
                });
                console.log("Contract verified successfully");
            } else {
                console.error("Failed to get transaction receipt");
            }
        }

        return { success: true, address: token.address };
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
