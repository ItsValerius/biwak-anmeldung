CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"salt" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
