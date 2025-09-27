import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import * as retry from "retry";

import { createUser, deleteUser, updateUser } from "@/db/users";
import type { ClerkDeleteUserWebhookPayload, ClerkEventT, ClerkUserWebhookPayload } from "@/types/clerk.types";

export const handleClerkUserEvent = async (req: NextRequest): Promise<{ error?: string }> => {
  const operation = retry.operation({
    retries: 2,
    factor: 2,
    minTimeout: 250,
    maxTimeout: 500,
  });

  return new Promise((resolve) => {
    operation.attempt(async (currentAttempt) => {
      try {
        const evt = await verifyWebhook(req);
        const event = evt.type as ClerkEventT;
        const payload = evt.data as unknown;

        switch (event) {
          case "user.created":
            await createUser(payload as ClerkUserWebhookPayload);
            break;
          case "user.updated":
            await updateUser(payload as ClerkUserWebhookPayload);
            break;
          case "user.deleted":
            await deleteUser(payload as ClerkDeleteUserWebhookPayload);
            break;
          default:
            return resolve({ error: "Unknown event type" });
        }

        resolve({});
      } catch (err) {
        console.error(`Attempt ${currentAttempt} failed:`, err);
        if (operation.retry(err as Error)) return;
        resolve({ error: "Error verifying webhook after retries" });
      }
    });
  });
};
