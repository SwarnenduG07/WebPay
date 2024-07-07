"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createonRampTransaction(amount: number, provider: string) {
      const session = await getServerSession(authOptions)
      const token = Math.random().toString();
      const userId = session.user.id;
      if(!userId) {
          return {
            message: "you are not logged in"
          }
      }
       prisma.onRampTransaction.create({
        data: {
            userId: Number(session?.user?.id),
            amount: amount * 100,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
         }
    });
     return {
      message: "Done"
     }
}