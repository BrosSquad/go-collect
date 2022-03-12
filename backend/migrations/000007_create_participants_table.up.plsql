CREATE TABLE participants(
    user_id bigserial NOT NULL,
    event_id bigserial NOT NULL,
    status text NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);