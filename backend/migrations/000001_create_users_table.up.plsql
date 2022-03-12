create TABLE IF NOT EXISTS users (
    id bigserial PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    city text NOT NULL,
    points bigint DEFAULT 0,
    created_at timestamp WITH TIME ZONE NOT NULL
);