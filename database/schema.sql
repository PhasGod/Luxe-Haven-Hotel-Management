CREATE TABLE guests (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_number VARCHAR(20) NOT NULL UNIQUE,
  room_type VARCHAR(80) NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_guest FOREIGN KEY (guest_id) REFERENCES guests(id),
  CONSTRAINT fk_bookings_room FOREIGN KEY (room_id) REFERENCES rooms(id),
  CONSTRAINT chk_booking_dates CHECK (check_out > check_in)
);

INSERT INTO rooms (room_number, room_type, price_per_night, is_available) VALUES
  ('101', 'Deluxe Room', 120.00, TRUE),
  ('203', 'Suite', 240.00, TRUE),
  ('305', 'Family Room', 180.00, FALSE);
