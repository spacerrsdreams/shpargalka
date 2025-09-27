import { Prisma } from "@/lib/prisma";
import type { ClerkDeleteUserWebhookPayload, ClerkUserWebhookPayload } from "@/types/clerk.types";

export const createUser = async (data: ClerkUserWebhookPayload) => {
  const email = data.email_addresses[0]?.email_address;

  if (!email) {
    throw new Error("No email found in Clerk webhook payload");
  }

  await Prisma.user.create({
    data: {
      userId: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email,
      imageUrl: data.image_url,
      profileImageUrl: data.profile_image_url,
      externalAccounts: {
        create:
          data.external_accounts?.map((account) => ({
            provider: account.provider,
            providerUserId: account.provider_user_id,
            email: account.email_address,
            firstName: account.first_name,
            lastName: account.last_name,
            avatarUrl: account.avatar_url,
          })) || [],
      },
    },
  });

  return { message: "User created successfully" };
};

export const updateUser = async (data: ClerkUserWebhookPayload) => {
  const email = data.email_addresses[0]?.email_address;

  if (!email) {
    throw new Error("No email found in Clerk webhook payload");
  }

  await Prisma.user.update({
    where: { userId: data.id },
    data: {
      firstName: data.first_name,
      lastName: data.last_name,
      email,
      imageUrl: data.image_url,
      profileImageUrl: data.profile_image_url,
      externalAccounts: {
        create:
          data.external_accounts?.map((account) => ({
            provider: account.provider,
            providerUserId: account.provider_user_id,
            email: account.email_address,
            firstName: account.first_name,
            lastName: account.last_name,
            avatarUrl: account.avatar_url,
          })) || [],
      },
    },
  });

  return { message: "User updated successfully" };
};

export const deleteUser = async (data: ClerkDeleteUserWebhookPayload) => {
  await Prisma.user.update({
    where: { userId: data.id },
    data: { deletedAt: new Date() },
  });

  return { message: "User deleted successfully" };
};

export const findUserByClerkId = async (clerkUserId: string) => {
  const user = await Prisma.user.findUnique({
    where: { userId: clerkUserId },
  });

  if (!user) {
    throw new Error(`User with id: ${clerkUserId} not found`);
  }

  return user;
};
