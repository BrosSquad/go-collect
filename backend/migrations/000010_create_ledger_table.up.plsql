CREATE TABLE ledger(
    id bigserial PRIMARY KEY,
    user_id bigserial NOT NULL,
    event_id bigserial NOT NULL,
    exchange_rate_id bigserial NOT NULL,
    quantity bigint NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);