-- Table: public.tb_posts

-- DROP TABLE IF EXISTS public.tb_posts;

CREATE TABLE IF NOT EXISTS public.tb_posts
(
    id integer NOT NULL DEFAULT nextval('tb_posts_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    content character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    main_content text COLLATE pg_catalog."default",
    CONSTRAINT tb_posts_pkey PRIMARY KEY (id),
    CONSTRAINT tb_posts_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_posts
    OWNER to postgres;