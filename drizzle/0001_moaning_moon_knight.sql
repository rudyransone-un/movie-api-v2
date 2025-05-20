PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kp_id` text NOT NULL,
	`title` text NOT NULL,
	`poster_url` text NOT NULL,
	`description` text,
	`short_description` text,
	`rating` real NOT NULL,
	`year` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_movies`("id", "kp_id", "title", "poster_url", "description", "short_description", "rating", "year") SELECT "id", "kp_id", "title", "poster_url", "description", "short_description", "rating", "year" FROM `movies`;--> statement-breakpoint
DROP TABLE `movies`;--> statement-breakpoint
ALTER TABLE `__new_movies` RENAME TO `movies`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `movies_kp_id_unique` ON `movies` (`kp_id`);