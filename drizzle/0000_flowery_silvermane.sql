CREATE TABLE `movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kp_id` text NOT NULL,
	`title` text NOT NULL,
	`poster_url` text NOT NULL,
	`description` text NOT NULL,
	`short_description` text NOT NULL,
	`rating` real NOT NULL,
	`year` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `movies_kp_id_unique` ON `movies` (`kp_id`);