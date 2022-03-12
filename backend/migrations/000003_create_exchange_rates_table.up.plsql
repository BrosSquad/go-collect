CREATE TABLE IF NOT EXISTS exchange_rates(
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    modifier bigint NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);