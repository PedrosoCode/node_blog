-- Table: public.tb_stc_damage_types

-- DROP TABLE IF EXISTS public.tb_stc_damage_types;

CREATE TABLE IF NOT EXISTS public.tb_stc_damage_types
(
    id integer NOT NULL DEFAULT nextval('tb_stc_damage_types_id_seq'::regclass),
    damage character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tb_stc_damage_types_pkey PRIMARY KEY (id),
    CONSTRAINT tb_stc_damage_types_damage_key UNIQUE (damage)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_stc_damage_types
    OWNER to postgres;