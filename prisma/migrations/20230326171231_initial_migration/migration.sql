-- CreateTable
CREATE TABLE `ShortUrls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `code` VARCHAR(5) NOT NULL,
    `hits` INTEGER NULL,
    `createdat` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `ownerid` INTEGER NOT NULL,

    UNIQUE INDEX `ShortUrls_code_key`(`code`),
    UNIQUE INDEX `ShortUrls_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `createdat` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
