/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `ShortUrls` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `ShortUrls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShortUrls_code_key" ON "ShortUrls"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrls_uuid_key" ON "ShortUrls"("uuid");
