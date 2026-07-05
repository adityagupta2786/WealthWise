from flask import Blueprint, request, jsonify
from database import connection
import bcrypt

auth = Blueprint("auth", __name__)

@auth.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    fullname = data.get("fullname")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not fullname or not email or not phone or not password:
        return jsonify({
            "success": False,
            "message": "Please fill all fields."
        }), 400

    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    existing = cursor.fetchone()

    if existing:
        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    cursor.execute(
    """
    INSERT INTO users
    (fullname, email, phone, password, role)
    VALUES (%s, %s, %s, %s, %s)
    """,
    (
        fullname,
        email,
        phone,
        hashed_password.decode("utf-8"),
        "customer"
    )
)

    connection.commit()

    return jsonify({
        "success": True,
        "message": "Account created successfully!"
    }), 201

@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Please enter email and password."
        }), 400

    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "success": False,
            "message": "Email not found."
        }), 404
    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        return jsonify({
            "success": False,
            "message": "Incorrect password."
        }), 401

    # Check if customer profile exists
    cursor.execute(
        "SELECT id FROM customer_profile WHERE user_id=%s",
        (user["id"],)
    )

    profile = cursor.fetchone()

    profile_completed = profile is not None

    return jsonify({

        "success": True,
        "message": "Login Successful!",

        "id": user["id"],
        "fullname": user["fullname"],
        "email": user["email"],
        "phone": user["phone"],
        "role": user["role"],

        "profileCompleted": profile_completed

    }), 200