ALTER TABLE goals
    ADD CONSTRAINT goals_event_id_constraint
    FOREIGN KEY (event_id) REFERENCES events(id)
    ON DELETE CASCADE;