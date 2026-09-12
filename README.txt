TELEPLAY — RED MOVIE WEBSITE + ADMIN PANEL

Files:
- index.html       public website
- admin.html       admin login + add/edit/delete dashboard
- app.js           public movie rendering
- admin.js         admin CRUD
- supabase-config.js  paste your Supabase URL + anon key here
- supabase.sql     create database + security policies
- style.css / admin.css

SETUP
1. Create a free Supabase project.
2. Open SQL Editor and run supabase.sql.
3. Create an email/password user under Authentication > Users.
4. Copy that user's UUID and run the INSERT command at the bottom of supabase.sql.
5. Put the Supabase Project URL and anon/publishable key into supabase-config.js.
6. Upload the folder to Vercel.
7. Public site: /index.html
8. Admin: /admin.html

The anon/publishable key is intended for browser use. Do NOT put a service_role/secret key in the website.
Poster images currently use a public image URL field. A Supabase Storage upload can be added as the next upgrade.
