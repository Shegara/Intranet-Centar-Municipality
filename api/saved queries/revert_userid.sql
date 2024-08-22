SELECT pg_get_serial_sequence('users', 'id');
SELECT SETVAL ('public.users_id_seq' ,1, false)
