from dotenv import load_dotenv
import os

load_dotenv()

# MYSQL
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DB = os.getenv("MYSQL_DB")

# S3
BUCKET_NAME = os.getenv("BUCKET_NAME")
SERVICE_NAME = os.getenv("SERVICE_NAME")
REGION_NAME = os.getenv("REGION_NAME")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")