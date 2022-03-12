CREATE TABLE achievements(
    id bigserial PRIMARY KEY,
    name text NOT NULL,
    image_url text NOT NULL,
    description text NOT NULL,
    points bigint NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);