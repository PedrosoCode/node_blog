-- Table: public.tb_rpg_weapons

-- DROP TABLE IF EXISTS public.tb_rpg_weapons;

CREATE TABLE IF NOT EXISTS public.tb_rpg_weapons
(
    id integer NOT NULL DEFAULT nextval('tb_rpg_weapons_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    damage character varying(50) COLLATE pg_catalog."default" NOT NULL,
    fixed_bonus integer DEFAULT 0,
    fixed_reduction integer DEFAULT 0,
    range character varying(50) COLLATE pg_catalog."default",
    hands character varying(50) COLLATE pg_catalog."default",
    throwable boolean DEFAULT false,
    damage_type_id integer NOT NULL,
    CONSTRAINT tb_rpg_weapons_pkey PRIMARY KEY (id),
    CONSTRAINT fk_damage_type FOREIGN KEY (damage_type_id)
        REFERENCES public.tb_stc_damage_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT tb_rpg_weapons_hands_check CHECK (hands::text = ANY (ARRAY['one'::character varying, 'two'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_rpg_weapons
    OWNER to postgres;