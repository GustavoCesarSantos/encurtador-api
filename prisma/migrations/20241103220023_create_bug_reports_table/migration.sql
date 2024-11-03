-- CreateTable
CREATE TABLE "BugReports" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'awaiting correction',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BugReports_pkey" PRIMARY KEY ("id")
);
