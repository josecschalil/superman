// lib/visitorUtils.js
import prisma from "./prisma";

let counterInitialized = false;

async function initializeCounter() {
  const counter = await prisma.visitorCount.findFirst();
  if (!counter) {
    await prisma.visitorCount.create({
      data: { count: 0 },
    });
  }
  counterInitialized = true;
}

export async function incrementVisitorCount() {
  if (!counterInitialized) await initializeCounter();

  const result = await prisma.visitorCount.updateMany({
    data: { count: { increment: 1 } },
  });

  const updatedCounter = await prisma.visitorCount.findFirst();
  return updatedCounter.count;
}

export async function getVisitorCount() {
  if (!counterInitialized) await initializeCounter();

  const counter = await prisma.visitorCount.findFirst();
  return counter?.count || 0;
}
