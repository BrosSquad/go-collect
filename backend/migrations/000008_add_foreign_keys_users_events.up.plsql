ALTER TABLE participants
    ADD CONSTRAINT participants_user_id_constraint
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE;

ALTER TABLE participants
    ADD CONSTRAINT participants_event_id_constraint
    FOREIGN KEY (event_id) REFERENCES events(id)
    ON DELETE CASCADE;