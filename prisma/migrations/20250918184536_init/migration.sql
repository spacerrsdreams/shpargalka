-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Admin', 'Moderator', 'User');

-- CreateEnum
CREATE TYPE "public"."RestrictionStatus" AS ENUM ('None', 'Restricted', 'Banned');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "restrictionStatus" "public"."RestrictionStatus" NOT NULL DEFAULT 'None',
    "roles" "public"."Role"[] DEFAULT ARRAY['User']::"public"."Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."ExternalAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "ExternalAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_userId_idx" ON "public"."User"("userId");

-- CreateIndex
CREATE INDEX "User_firstName_lastName_idx" ON "public"."User"("firstName", "lastName");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "public"."User"("createdAt");

-- CreateIndex
CREATE INDEX "ExternalAccount_userId_idx" ON "public"."ExternalAccount"("userId");

-- CreateIndex
CREATE INDEX "ExternalAccount_provider_providerUserId_idx" ON "public"."ExternalAccount"("provider", "providerUserId");

-- CreateIndex
CREATE INDEX "ExternalAccount_email_idx" ON "public"."ExternalAccount"("email");

-- AddForeignKey
ALTER TABLE "public"."ExternalAccount" ADD CONSTRAINT "ExternalAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
