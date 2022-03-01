import boto3
from src.config.env import SERVICE_NAME, REGION_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

S3 = boto3.resource(
    service_name = SERVICE_NAME,
    region_name = REGION_NAME,
    aws_access_key_id = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY
)