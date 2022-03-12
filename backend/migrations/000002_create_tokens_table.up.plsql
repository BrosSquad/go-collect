create TABLE IF NOT EXISTS tokens (
    id bigserial PRIMARY KEY,
    token text NOT NULL,
    created_at timestamp WITH TIME ZONE NOT NULL
);