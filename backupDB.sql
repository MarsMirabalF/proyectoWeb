--
-- PostgreSQL database dump
--

\restrict 4B78cEbbBhIx1oty0zimt3M7zreKydbs2ET3t3aCd28TCVnvV0Ffk6qKbcwVsAz

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-01 23:11:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24577)
-- Name: archivos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.archivos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    extension character varying(50) NOT NULL,
    tamano integer NOT NULL,
    ruta character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.archivos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24576)
-- Name: archivos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.archivos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.archivos_id_seq OWNER TO postgres;

--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 223
-- Name: archivos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.archivos_id_seq OWNED BY public.archivos.id;


--
-- TOC entry 222 (class 1259 OID 16403)
-- Name: notas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notas (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    titulo character varying(100) NOT NULL,
    detalle text,
    hora time without time zone,
    fecha date,
    completada boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16402)
-- Name: notas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notas_id_seq OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 221
-- Name: notas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notas_id_seq OWNED BY public.notas.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4872 (class 2604 OID 24580)
-- Name: archivos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos ALTER COLUMN id SET DEFAULT nextval('public.archivos_id_seq'::regclass);


--
-- TOC entry 4868 (class 2604 OID 16406)
-- Name: notas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas ALTER COLUMN id SET DEFAULT nextval('public.notas_id_seq'::regclass);


--
-- TOC entry 4866 (class 2604 OID 16393)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 24577)
-- Dependencies: 224
-- Data for Name: archivos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.archivos (id, usuario_id, nombre, extension, tamano, ruta, created_at, updated_at) FROM stdin;
15	12	a.cpp	.cpp	369	repos/usuario_12/1780368802445_a.cpp	2026-06-02 02:53:22.549514	2026-06-02 02:53:22.549514
16	12	b.cpp	.cpp	443	repos/usuario_12/1780368812772_b.cpp	2026-06-02 02:53:32.876229	2026-06-02 02:53:32.876229
17	10	b.cpp	.cpp	443	repos/usuario_10/1780368843717_b.cpp	2026-06-02 02:54:03.902282	2026-06-02 02:54:03.902282
18	10	133659618506342493.jpg	.jpg	1863169	repos/usuario_10/1780368854027_133659618506342493.jpg	2026-06-02 02:54:14.170301	2026-06-02 02:54:14.170301
19	11	133861712605634268.jpg	.jpg	1907512	repos/usuario_11/1780368926018_133861712605634268.jpg	2026-06-02 02:55:26.217716	2026-06-02 02:55:26.217716
20	15	marcelo.tex	.tex	4833	repos/usuario_15/1780369255345_marcelo.tex	2026-06-02 03:00:55.513994	2026-06-02 03:00:55.513994
21	15	investigacion_bioqfarma_iomt (1).docx	.docx	749201	repos/usuario_15/1780369276024_investigacion_bioqfarma_iomt_(1).docx	2026-06-02 03:01:16.16927	2026-06-02 03:01:16.16927
22	16	a2.cpp	.cpp	1363	repos/usuario_16/1780369359493_a2.cpp	2026-06-02 03:02:39.634602	2026-06-02 03:02:39.634602
23	16	b2.cpp	.cpp	4160	repos/usuario_16/1780369362741_b2.cpp	2026-06-02 03:02:42.75895	2026-06-02 03:02:42.75895
24	16	c2.cpp	.cpp	3462	repos/usuario_16/1780369367057_c2.cpp	2026-06-02 03:02:47.064631	2026-06-02 03:02:47.064631
25	17	134095221829951228.jpg	.jpg	2140967	repos/usuario_17/1780369739644_134095221829951228.jpg	2026-06-02 03:09:00.008385	2026-06-02 03:09:00.008385
26	17	investigacion_bioqfarma_iomt (1).docx	.docx	749201	repos/usuario_17/1780369750551_investigacion_bioqfarma_iomt_(1).docx	2026-06-02 03:09:10.679394	2026-06-02 03:09:10.679394
27	17	marcelo.tex	.tex	4833	repos/usuario_17/1780369755229_marcelo.tex	2026-06-02 03:09:15.232219	2026-06-02 03:09:15.232219
\.


--
-- TOC entry 5035 (class 0 OID 16403)
-- Dependencies: 222
-- Data for Name: notas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notas (id, usuario_id, titulo, detalle, hora, fecha, completada, created_at, updated_at) FROM stdin;
46	10	Hacer Compras	debe ser rapido	10:00:00	2024-06-15	f	2026-06-02 02:50:44.235563	2026-06-02 02:50:44.235563
47	10	Ir al gym	tomar proteina	10:00:00	2024-06-15	f	2026-06-02 02:51:06.720198	2026-06-02 02:51:06.720198
48	11	Ir al gym	tomar proteina	10:00:00	2024-06-15	f	2026-06-02 02:51:34.723014	2026-06-02 02:51:34.723014
49	11	Correr	tomar agua	10:00:00	2024-06-15	f	2026-06-02 02:51:50.888043	2026-06-02 02:51:50.888043
50	12	Correr	tomar agua	10:00:00	2024-06-15	f	2026-06-02 02:52:26.071551	2026-06-02 02:52:26.071551
51	13	Correr	tomar agua	10:00:00	2024-06-15	f	2026-06-02 02:57:38.83324	2026-06-02 02:57:38.83324
52	13	Velocidad	Flash	10:00:00	2024-06-15	f	2026-06-02 02:57:56.56252	2026-06-02 02:57:56.56252
53	14	Hacer de web	es muy complicado	10:00:00	2024-06-15	f	2026-06-02 02:58:49.896188	2026-06-02 02:58:49.896188
54	15	Dominadas diarias	debo hacer al menos 7	10:00:00	2024-06-15	f	2026-06-02 02:59:49.912198	2026-06-02 02:59:49.912198
55	15	Cardio	debo caminar al menos 30 min	10:00:00	2024-06-15	f	2026-06-02 03:00:08.422174	2026-06-02 03:00:08.422174
57	17	Organizar Sani cup	Esto requiere mucho0 tiempo	10:00:00	2024-06-15	f	2026-06-02 03:05:49.7049	2026-06-02 03:05:49.7049
58	17	Organizar OhSanSi	Esto requiere mucho mas tiempo	10:00:00	2024-06-15	f	2026-06-02 03:06:22.934186	2026-06-02 03:06:22.934186
59	17	Revisar repositorios de web	Esto requiere mucho mas y mas tiempo	10:00:00	2024-06-15	f	2026-06-02 03:06:51.866788	2026-06-02 03:06:51.866788
\.


--
-- TOC entry 5033 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, username, password_hash, created_at) FROM stdin;
10	carlos	$2b$10$pnsawOwpSC/wloIWxBhjvee8w2hyQvJac1I0XGtGRB0w7T5Zbrw7q	2026-06-01 20:44:27.48099
11	maria	$2b$10$1ChC0AVZR1RJjUXJfgpSOukv4jH/1BS0NchyXi00uNfzh2Q1jyn5y	2026-06-01 21:13:50.396969
12	pedro	$2b$10$BD8HVSa/yZ.aIo.6EBodZODZKdQHEnr40ZRHyL6OE2XwupSb9nAie	2026-06-02 02:48:45.06294
13	juan	$2b$10$yvUb8g/qOmDA5a0EffObz.ydlY/rfUzoajAgEPTAAG471x0T2SBd.	2026-06-02 02:48:51.165361
14	roberto	$2b$10$7mZggpDbRWA0MmQnuJYsCOYygQT2M1sOWBDC3xKUB2BCCwgrdz9Le	2026-06-02 02:48:57.806912
15	marcelo	$2b$10$hWTJjfQAa5Fh4TwnXKTsS.HjAPAR5zqLvDEeSCgYkdTBJfGrLqPym	2026-06-02 02:49:04.049403
16	leticia	$2b$10$AuL0XHKy6kDI9cHTkWTmEOZKEHz7.Hdjo4IsU085f6ncN.UCd5UhK	2026-06-02 02:49:11.290142
17	vladimir	$2b$10$90eBeipylUt2YrhnSqjWr.AibTin07wuTqvIiRUELZ53Wv8W.Sigy	2026-06-02 02:49:18.176611
\.


--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 223
-- Name: archivos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.archivos_id_seq', 27, true);


--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 221
-- Name: notas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notas_id_seq', 59, true);


--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 17, true);


--
-- TOC entry 4882 (class 2606 OID 24592)
-- Name: archivos archivos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos
    ADD CONSTRAINT archivos_pkey PRIMARY KEY (id);


--
-- TOC entry 4880 (class 2606 OID 16416)
-- Name: notas notas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_pkey PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 16399)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4878 (class 2606 OID 16401)
-- Name: usuarios usuarios_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);


--
-- TOC entry 4884 (class 2606 OID 24593)
-- Name: archivos archivos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.archivos
    ADD CONSTRAINT archivos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 16417)
-- Name: notas notas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


-- Completed on 2026-06-01 23:11:55

--
-- PostgreSQL database dump complete
--

\unrestrict 4B78cEbbBhIx1oty0zimt3M7zreKydbs2ET3t3aCd28TCVnvV0Ffk6qKbcwVsAz

