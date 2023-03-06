-- AddForeignKey
ALTER TABLE "ShortUrls" ADD CONSTRAINT "ShortUrls_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "Owners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
