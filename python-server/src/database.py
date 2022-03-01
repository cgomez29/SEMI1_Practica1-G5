import pymysql
from settings import DB_ENDPOINT, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

# database connection
DB = pymysql.connect(
    host=DB_ENDPOINT,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME,
    port=int(DB_PORT)
)
