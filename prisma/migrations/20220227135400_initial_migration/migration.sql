-- CreateTable
CREATE TABLE "ShortUrls" (
    "id" SERIAL NOT NULL,
    "uuid" INTEGER NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "hits" INTEGER,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerid" INTEGER NOT NULL,

    CONSTRAINT "ShortUrls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owners" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "Owners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShortUrls" ADD CONSTRAINT "ShortUrls_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "Owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
