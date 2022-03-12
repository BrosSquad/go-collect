ALTER TABLE achievement_user
    ADD CONSTRAINT achievement_user_id_constraint
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE;

ALTER TABLE achievement_user
    ADD CONSTRAINT participants_achievement_id_constraint
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
    ON DELETE CASCADE;