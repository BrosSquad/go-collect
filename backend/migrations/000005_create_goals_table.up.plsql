CREATE TABLE goals(
    id bigserial PRIMARY KEY,
    event_id bigserial NOT NULL,
    points bigint NOT NULL DEFAULT 0,
    created_at timestamp WITH TIME ZONE NOT NULL
);