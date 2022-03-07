from dotenv import load_dotenv
import os

load_dotenv()

# DATABASE
DB_ENDPOINT = os.getenv("DB_ENDPOINT")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

# S3
BUCKET_NAME = os.getenv("BUCKET_NAME")
SERVICE_NAME = os.getenv("SERVICE_NAME")
REGION_NAME = os.getenv("REGION_NAME")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")