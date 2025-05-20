ALTER TABLE `movies` RENAME COLUMN "originalTitle" TO "original_title";--> statement-breakpoint
CREATE INDEX `kp_id` ON `movies` (`kp_id`);--> statement-breakpoint
CREATE INDEX `title` ON `movies` (`title`);--> statement-breakpoint
CREATE INDEX `original_title` ON `movies` (`original_title`);