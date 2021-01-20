DROP TABLE IF EXISTS banner;

CREATE TABLE banner (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  banner_name TEXT UNIQUE NOT NULL,
  code TEXT NOT NULL,
  image_filename TEXT NOT NULL,
  faction TEXT NOT NULL,
  creator TEXT
);