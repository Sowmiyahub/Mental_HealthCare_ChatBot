from datetime import datetime
from ChatbotWebsite import db, login_manager
from flask_login import UserMixin
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from flask import current_app

# Load user by ID
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# User class for the database
class User(db.Model, UserMixin):
    __tablename__ = "users"  # ✅ Explicitly set table name

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    profile_image = db.Column(db.String(20), nullable=False, default="default.jpg")

    # One-to-Many relationship
    messages = db.relationship("ChatMessage", backref="user", lazy=True)
    journals = db.relationship("Journal", backref="user", lazy=True)

    # Generate reset password token
    def get_reset_token(self):
        s = Serializer(current_app.config['SECRET_KEY'])
        return s.dumps({'user_id': self.id})

    # Verify reset token
    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token, max_age=1800)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"<User {self.username}, {self.email}>"

# ChatMessage class for the database
class ChatMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(5), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # ✅ Use UTC time
    message = db.Column(db.String(3000), nullable=False)
    
    # ✅ Fix ForeignKey reference (use 'users.id' instead of 'user.id')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<ChatMessage Sender: {self.sender}, Time: {self.timestamp}>"

# Journal class for the database
class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # ✅ Use UTC time
    mood = db.Column(db.String(30), nullable=False)
    content = db.Column(db.String(3000), nullable=False)

    # ✅ Fix ForeignKey reference (use 'users.id' instead of 'user.id')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Journal Mood: {self.mood}, Time: {self.timestamp}>"
