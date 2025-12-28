"""Generate a proper bcrypt hash for the test user password"""
import bcrypt

password = "test123"
password_bytes = password.encode('utf-8')
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password_bytes, salt)
print(hashed.decode('utf-8'))
