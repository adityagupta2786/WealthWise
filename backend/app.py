from flask import Flask
from flask_cors import CORS
from database import connection
from routes.auth import auth
from routes.profile import profile

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth)
app.register_blueprint(profile) 

@app.route("/")
def home():
    return {
        "message": "🚀 WealthWise Backend Running Successfully!"
    }

@app.route("/testdb")
def testdb():

    if connection.is_connected():
        return {
            "status": "✅ Database Connected Successfully!"
        }

    return {
        "status": "❌ Database Connection Failed!"
    }

# print(app.url_map)

def create_tables():

    cursor = connection.cursor()

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS customer_profile (

        id INT AUTO_INCREMENT PRIMARY KEY,

        user_id INT NOT NULL UNIQUE,

        age INT NOT NULL,

        occupation VARCHAR(100) NOT NULL,

        monthly_income DECIMAL(12,2) NOT NULL,

        monthly_expenses DECIMAL(12,2) NOT NULL,

        current_balance DECIMAL(12,2) NOT NULL,

        financial_goal VARCHAR(100) NOT NULL,

        risk_appetite VARCHAR(20) NOT NULL,

        investment_experience VARCHAR(50) NOT NULL,

        existing_loan VARCHAR(100),

        investments TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(user_id)

        REFERENCES users(id)

        ON DELETE CASCADE

    )

    """)

    connection.commit()

    print("✅ customer_profile table ready.")

if __name__ == "__main__":
    create_tables()
    app.run(debug=True)