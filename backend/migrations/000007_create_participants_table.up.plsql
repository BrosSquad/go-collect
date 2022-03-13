CREATE TABLE participants(
    id bigserial NOT NULL PRIMARY KEY,
    user_id bigint NOT NULL,
    event_id bigint NOT NULL,
    status text NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);
