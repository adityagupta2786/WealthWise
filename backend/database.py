import mysql.connector
from config import *

try:
    connection = mysql.connector.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
    )

    cursor = connection.cursor()

    print("✅ MySQL Connected Successfully!")

except mysql.connector.Error as err:
    print("❌ Database Connection Error:", err)