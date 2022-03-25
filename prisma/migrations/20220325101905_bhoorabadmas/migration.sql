-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "roll_no" TEXT,
    "full_name" TEXT,
    "project_name" TEXT,
    "operating_system" TEXT,
    "code_editor" TEXT,
    "database" TEXT[],
    "misc" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
