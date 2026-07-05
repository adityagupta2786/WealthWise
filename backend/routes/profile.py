from flask import Blueprint, request, jsonify
from database import connection

profile = Blueprint("profile", __name__)

@profile.route("/complete-profile", methods=["POST"])
def complete_profile():

    data = request.get_json()

    user_id = data.get("userId")
    age = data.get("age")
    occupation = data.get("occupation")
    income = data.get("income")
    expenses = data.get("expenses")
    balance = data.get("savings")
    goal = data.get("goal")
    risk = data.get("risk")
    experience = data.get("experience")
    loan = data.get("loan")
    investments = ",".join(data.get("investments", []))

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO customer_profile
        (
            user_id,
            age,
            occupation,
            monthly_income,
            monthly_expenses,
            current_balance,
            financial_goal,
            risk_appetite,
            investment_experience,
            existing_loan,
            investments
        )
        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,(
        user_id,
        age,
        occupation,
        income,
        expenses,
        balance,
        goal,
        risk,
        experience,
        loan,
        investments
    ))

    connection.commit()

    return jsonify({
        "success": True,
        "message": "Profile Saved Successfully!"
    }),200
@profile.route("/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):

    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            u.fullname,
            u.email,
            u.phone,

            cp.age,
            cp.occupation,
            cp.monthly_income,
            cp.monthly_expenses,
            cp.current_balance,
            cp.financial_goal,
            cp.risk_appetite,
            cp.investment_experience,
            cp.existing_loan,
            cp.investments

        FROM users u

        JOIN customer_profile cp
        ON u.id = cp.user_id

        WHERE u.id = %s
    """, (user_id,))

    profile = cursor.fetchone()
    if profile:

        # ==========================
        # Financial Health Score
        # ==========================

        income = float(profile["monthly_income"])
        expenses = float(profile["monthly_expenses"])
        balance = float(profile["current_balance"])

        savings = income - expenses

        # ---------- Savings Score (40) ----------
        savings_rate = (savings / income) * 100 if income > 0 else 0

        if savings_rate >= 40:
            savings_score = 40
        elif savings_rate >= 25:
            savings_score = 30
        elif savings_rate >= 10:
            savings_score = 20
        else:
            savings_score = 10

        # ---------- Balance Score (30) ----------
        if balance >= income * 6:
            balance_score = 30
        elif balance >= income * 3:
            balance_score = 20
        elif balance >= income:
            balance_score = 10
        else:
            balance_score = 5

        # ---------- Loan Score (20) ----------
        loan = profile["existing_loan"]

        if loan == "None":
            loan_score = 20
        elif loan == "Education Loan":
            loan_score = 15
        elif loan == "Home Loan":
            loan_score = 12
        elif loan == "Car Loan":
            loan_score = 10
        else:
            loan_score = 5

        # ---------- Investment Score (10) ----------
        exp = profile["investment_experience"]

        if exp == "Advanced":
            investment_score = 10
        elif exp == "Intermediate":
            investment_score = 7
        else:
            investment_score = 5

        # ---------- Final Score ----------
        health_score = (
            savings_score +
            balance_score +
            loan_score +
            investment_score
        )

        profile["health_score"] = health_score
        profile["test"] = "NEW CODE RUNNING"

        return jsonify({

            "success": True,

            "profile": profile

        })

    return jsonify({
        "success": False,
        "message": "Profile not found."
    }), 404