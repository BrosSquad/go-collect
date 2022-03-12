CREATE TABLE events(
    id bigserial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    location text NOT NULL,
    image_url text NOT NULL,
    cover_url text NOT NULL,
    start_datetime timestamp WITH TIME ZONE NOT NULL,
    end_datetime timestamp WITH TIME ZONE NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);