CREATE TABLE achievement_user(
   achievement_id bigserial NOT NULL,
   user_id  bigserial NOT NULL,
   created_at timestamp WITH TIME ZONE NOT NULL
);