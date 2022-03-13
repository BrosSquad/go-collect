ALTER TABLE ledgers
    ADD CONSTRAINT ledger_user_id_constrint
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE;

ALTER TABLE ledgers
    ADD CONSTRAINT ledger_event_id_constraint
    FOREIGN KEY (event_id) REFERENCES events(id)
    ON DELETE CASCADE;

ALTER TABLE ledgers
    ADD CONSTRAINT ledger_exchange_rate_id_constraint
    FOREIGN KEY (exchange_rate_id) REFERENCES exchange_rates(id)
    ON DELETE CASCADE;