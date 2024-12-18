PGDMP                  	    |            binar_challenge4    16.3    16.3 2               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            !           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            "           1262    16530    binar_challenge4    DATABASE     �   CREATE DATABASE binar_challenge4 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
     DROP DATABASE binar_challenge4;
                postgres    false            �            1259    16554    Bank_accounts    TABLE     �   CREATE TABLE public."Bank_accounts" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    bank_name text NOT NULL,
    bank_account_number integer NOT NULL,
    balance double precision NOT NULL
);
 #   DROP TABLE public."Bank_accounts";
       public         heap    postgres    false            �            1259    16553    Bank_accounts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bank_accounts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Bank_accounts_id_seq";
       public          postgres    false    219            #           0    0    Bank_accounts_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Bank_accounts_id_seq" OWNED BY public."Bank_accounts".id;
          public          postgres    false    218            �            1259    16563    Profiles    TABLE     �   CREATE TABLE public."Profiles" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    identity_type text NOT NULL,
    identity_number text NOT NULL,
    address text NOT NULL
);
    DROP TABLE public."Profiles";
       public         heap    postgres    false            �            1259    16562    Profiles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Profiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Profiles_id_seq";
       public          postgres    false    221            $           0    0    Profiles_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Profiles_id_seq" OWNED BY public."Profiles".id;
          public          postgres    false    220            �            1259    16572    Transactions    TABLE     �   CREATE TABLE public."Transactions" (
    id integer NOT NULL,
    source_account_id integer NOT NULL,
    destination_account_id integer NOT NULL,
    amount double precision NOT NULL
);
 "   DROP TABLE public."Transactions";
       public         heap    postgres    false            �            1259    16571    Transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Transactions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Transactions_id_seq";
       public          postgres    false    223            %           0    0    Transactions_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Transactions_id_seq" OWNED BY public."Transactions".id;
          public          postgres    false    222            �            1259    16960 	   UserLogin    TABLE     u   CREATE TABLE public."UserLogin" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public."UserLogin";
       public         heap    postgres    false            �            1259    16959    UserLogin_id_seq    SEQUENCE     �   CREATE SEQUENCE public."UserLogin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."UserLogin_id_seq";
       public          postgres    false    225            &           0    0    UserLogin_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."UserLogin_id_seq" OWNED BY public."UserLogin".id;
          public          postgres    false    224            �            1259    16545    Users    TABLE     �   CREATE TABLE public."Users" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16544    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    217            '           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    216            �            1259    16533    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            k           2604    16557    Bank_accounts id    DEFAULT     x   ALTER TABLE ONLY public."Bank_accounts" ALTER COLUMN id SET DEFAULT nextval('public."Bank_accounts_id_seq"'::regclass);
 A   ALTER TABLE public."Bank_accounts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            l           2604    16566    Profiles id    DEFAULT     n   ALTER TABLE ONLY public."Profiles" ALTER COLUMN id SET DEFAULT nextval('public."Profiles_id_seq"'::regclass);
 <   ALTER TABLE public."Profiles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            m           2604    16575    Transactions id    DEFAULT     v   ALTER TABLE ONLY public."Transactions" ALTER COLUMN id SET DEFAULT nextval('public."Transactions_id_seq"'::regclass);
 @   ALTER TABLE public."Transactions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            n           2604    16963    UserLogin id    DEFAULT     p   ALTER TABLE ONLY public."UserLogin" ALTER COLUMN id SET DEFAULT nextval('public."UserLogin_id_seq"'::regclass);
 =   ALTER TABLE public."UserLogin" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            j           2604    16548    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    16554    Bank_accounts 
   TABLE DATA           _   COPY public."Bank_accounts" (id, user_id, bank_name, bank_account_number, balance) FROM stdin;
    public          postgres    false    219   �:                 0    16563    Profiles 
   TABLE DATA           Z   COPY public."Profiles" (id, user_id, identity_type, identity_number, address) FROM stdin;
    public          postgres    false    221   R;                 0    16572    Transactions 
   TABLE DATA           _   COPY public."Transactions" (id, source_account_id, destination_account_id, amount) FROM stdin;
    public          postgres    false    223   �;                 0    16960 	   UserLogin 
   TABLE DATA           =   COPY public."UserLogin" (id, username, password) FROM stdin;
    public          postgres    false    225   $<                 0    16545    Users 
   TABLE DATA           <   COPY public."Users" (id, name, email, password) FROM stdin;
    public          postgres    false    217   "=                 0    16533    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �=       (           0    0    Bank_accounts_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Bank_accounts_id_seq"', 7, true);
          public          postgres    false    218            )           0    0    Profiles_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Profiles_id_seq"', 8, true);
          public          postgres    false    220            *           0    0    Transactions_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Transactions_id_seq"', 10, true);
          public          postgres    false    222            +           0    0    UserLogin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."UserLogin_id_seq"', 7, true);
          public          postgres    false    224            ,           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 8, true);
          public          postgres    false    216            v           2606    16561     Bank_accounts Bank_accounts_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Bank_accounts"
    ADD CONSTRAINT "Bank_accounts_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Bank_accounts" DROP CONSTRAINT "Bank_accounts_pkey";
       public            postgres    false    219            x           2606    16570    Profiles Profiles_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Profiles"
    ADD CONSTRAINT "Profiles_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Profiles" DROP CONSTRAINT "Profiles_pkey";
       public            postgres    false    221            {           2606    16577    Transactions Transactions_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Transactions" DROP CONSTRAINT "Transactions_pkey";
       public            postgres    false    223            }           2606    16967    UserLogin UserLogin_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."UserLogin"
    ADD CONSTRAINT "UserLogin_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."UserLogin" DROP CONSTRAINT "UserLogin_pkey";
       public            postgres    false    225            s           2606    16552    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    217            p           2606    16541 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            t           1259    16579 %   Bank_accounts_bank_account_number_key    INDEX     y   CREATE UNIQUE INDEX "Bank_accounts_bank_account_number_key" ON public."Bank_accounts" USING btree (bank_account_number);
 ;   DROP INDEX public."Bank_accounts_bank_account_number_key";
       public            postgres    false    219            y           1259    16580    Profiles_user_id_key    INDEX     W   CREATE UNIQUE INDEX "Profiles_user_id_key" ON public."Profiles" USING btree (user_id);
 *   DROP INDEX public."Profiles_user_id_key";
       public            postgres    false    221            ~           1259    16968    UserLogin_username_key    INDEX     [   CREATE UNIQUE INDEX "UserLogin_username_key" ON public."UserLogin" USING btree (username);
 ,   DROP INDEX public."UserLogin_username_key";
       public            postgres    false    225            q           1259    16578    Users_email_key    INDEX     M   CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);
 %   DROP INDEX public."Users_email_key";
       public            postgres    false    217                       2606    16581 (   Bank_accounts Bank_accounts_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bank_accounts"
    ADD CONSTRAINT "Bank_accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."Bank_accounts" DROP CONSTRAINT "Bank_accounts_user_id_fkey";
       public          postgres    false    4723    217    219            �           2606    16586    Profiles Profiles_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Profiles"
    ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."Profiles" DROP CONSTRAINT "Profiles_user_id_fkey";
       public          postgres    false    217    4723    221            �           2606    16596 5   Transactions Transactions_destination_account_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_destination_account_id_fkey" FOREIGN KEY (destination_account_id) REFERENCES public."Bank_accounts"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public."Transactions" DROP CONSTRAINT "Transactions_destination_account_id_fkey";
       public          postgres    false    223    4726    219            �           2606    16591 0   Transactions Transactions_source_account_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_source_account_id_fkey" FOREIGN KEY (source_account_id) REFERENCES public."Bank_accounts"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public."Transactions" DROP CONSTRAINT "Transactions_source_account_id_fkey";
       public          postgres    false    4726    223    219               p   x�3�4�tJ��V�OSp���K�455524�43 .sNSN�̒�$�"N#C#ccNsS��1�1DsPbveb��g^J~^jq&�CS###N#KsS. �:C��f@�1z\\\ |�$D         �   x�e�;
�0뷧�L@+ɸO��ȧK�c�m������P ��x�9���8�C�jo�<	yx���i�a�lp�P��[ٕ��.i��������v��P���Qa�8,��:��Xu�z!�s���uCD/�54|         ,   x�3�4�4�457�2��@���c�̱@�X"s�y1z\\\ ���         �   x�5�ɒC@  г�g�2�3��텚�H[b�D��TM��Ruލ��4d�}i�.Lդp�Ի=Pts b�V����D��O�̏e_ڔ%ydԌ��8��yS�g^�+��U���%�ղ�V�/Y�����)21ve-�B�c��e��{�:	,�J�ȟ�T�Ϝ�u*)B�$�:f��a�/G$@�?���p����k�a���L��f��вy.ేH��
ݛD��w1 ? ��U}         �   x�M��
�0Dϻ_�/(4Q��M��RQ{$�P�4Y)��}c[IO;��G2����V��ȷ��v���˞��K��I�E�Q�LMJ帅k�rԋ2�����pe��,�����{�W�H�p"'
�M/^q>ª�%'e�
�,n�p�1ey\5����=C�/��V%         �   x�e�Kj1D�3��>h�Z�C�#��`8��3N1	�i^�jto:�R�$�9�jM8�Z�:yU��3O�!��P�\����=��i%�pH)ڛ��B{�B@����vd� ��	�������|�\/�����o�����fS "�(]wy��6-i d�L��[�rF	�V'���'�^%�Q�4�}b��h2�)�ʓ��{6��`OBE���>n�׷���φG�?Nۺ�_m�]�     