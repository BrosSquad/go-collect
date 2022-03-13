CREATE TABLE achievement_user(
   achievement_id bigint NOT NULL,
   user_id  bigint NOT NULL,
   CONSTRAINT pk_achievement_user PRIMARY KEY(achievement_id, user_id)
);
