-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "account" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "currency" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "side" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "grossProceeds" DOUBLE PRECISION NOT NULL,
    "netProceeds" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
