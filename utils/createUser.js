const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const result = await prisma.usuario.create({
        data: {
            username: "admin",
            password: "admin",
        },
    });
    console.log(result);
}

main();

