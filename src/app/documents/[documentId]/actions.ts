"use server";
import { clerkClient, auth } from "@clerk/nextjs/server";
export const getUsers = async () => {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();
  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));
  return users;
};
