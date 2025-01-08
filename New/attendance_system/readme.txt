--------Project Structure-------
attendance_system/
│
├── database/
│   ├── 01_init_database.sql
│   ├── 02_create_tables.sql
│   ├── 03_stored_procedures.sql
│   ├── 04_views.sql
│   └── 05_triggers.sql
│
├── src/
│   ├── config/
│   │   └── db_config.php
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── dashboard.js
│   │   └── portal.js
│   │
│   └── php/
│       ├── auth.php
│       └── api.php
│
└── public/
    ├── index.html
    ├── dashboard.html
    └── portal.html

-------SQL Execution Format--------
mysql -u root -p < 01_init_database.sql
mysql -u root -p attendance_system < 02_create_tables.sql
mysql -u root -p attendance_system < 03_stored_procedures.sql
mysql -u root -p attendance_system < 04_views.sql
mysql -u root -p attendance_system < 05_triggers.sql
