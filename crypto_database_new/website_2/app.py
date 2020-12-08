from myproject import app
from flask import render_template, redirect, request, url_for, send_from_directory
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, TextAreaField, BooleanField, IntegerField, FloatField, ValidationError, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from flask_migrate import Migrate
import requests
import json
import datetime
from flask_login import LoginManager, UserMixin, login_user,login_required,logout_user,current_user
from werkzeug.security import generate_password_hash, check_password_hash

####################
###### Configs #####
####################

#### Config for forms ####
app.config["SECRET_KEY"] = "mysecretkey"

#### Config for sqlite database ####
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# engine = create_engine('sqlite:///' + os.path.join(basedir, 'data.sqlite'), pool_recycle=280)

db = SQLAlchemy(app)
Migrate(app,db)

#### Config for login ###
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "signin"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

##################
###### FORMS #####
##################
class AddCoinForm(FlaskForm):
    symbol = StringField("Currency Symbol")
    price_pur = FloatField("Average Purchase Price")
    amount = FloatField("Amount Owned")
    submit1 = SubmitField("Submit")

class DeleteCoinForm(FlaskForm):
    symbol = StringField("Symbol to Remove")
    submit2 = SubmitField("Submit")

class LoginForm(FlaskForm):
    email = StringField('Email',validators=[DataRequired(),Email()])
    password = PasswordField('Password',validators=[DataRequired()])
    submit3 = SubmitField('Log in')

class RegistrationForm(FlaskForm):

    email = StringField('Email',validators=[DataRequired(),Email()])
    username = StringField('Username',validators=[DataRequired()])
    password = PasswordField('Password',validators=[DataRequired(),EqualTo('pass_confirm',message='Wrong Password')])
    pass_confirm = PasswordField('Confirm Password',validators=[DataRequired()])
    submit4 = SubmitField('Register')

    def check_email(self,field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Your email has already been registered!')

    def check_username(self,field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username is taken!')

class CurrencyForm(FlaskForm):
    # currency = StringField("Currency to convert: ")
    currency = SelectField('Select Surrency: ', choices=[('EUR', 'Euro'), ('USD', 'US Dollar'), ('CAD', 'Canadian Dollar'), ('GBP', 'Brittish Pound'), ('CNY', 'Chinese Renminbi'), ('HKD', 'Hong Kong Dollar'), ('AUD', 'Australian Dollar'), ('CHF', 'Swiss Franc'), ('RUB', 'Russian Ruble'), ('JPY', 'Japanese Yen'), ('NZD', 'New Zealand Dollar'), ('ZAR', 'South African Rand'), ('KRW', 'South Korean Won'), ('SEK', 'Sedish Krona')])
    amount = StringField("Amount to convert: ")
    submit = SubmitField("Submit")

################
#### MODELS ####
################

class Portfolio(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    coin = db.Column(db.Text)
    price_pur = db.Column(db.Float)
    amount = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, coin, price_pur, amount, user_id):
        self.coin = coin
        self.price_pur = price_pur
        self.amount = amount
        self.user_id = user_id

    def __repr__(self):
        return f"{self.coin} is valued at {self.price_pur}per coin. You own {self.amount}."

class User(db.Model,UserMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String(64),unique=True,index=True)
    username = db.Column(db.String(64),unique=True,index=True)
    password_hash = db.Column(db.String(128))
    # This connects coins to a User owner.
    coins = db.relationship('Portfolio',backref='owner',lazy='dynamic')

    def __init__(self,email,username,password):
        self.email = email
        self.username = username
        self.password_hash = generate_password_hash(password)

    def check_password(self,password):
        return check_password_hash(self.password_hash,password)

##################
#### ROUTES ######
##################

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/crypto_portfolio", methods=["GET","POST"])
@login_required
def home():

    # the_coins = CoinInput.query.filter_by(owner=current_user)
    # my_portfolio = Portfolio.query.all()
    my_portfolio = Portfolio.query.filter_by(owner=current_user)
    if my_portfolio:

        api_request = requests.get('https://api.nomics.com/v1/currencies/ticker?key=0076988cd41d5db43fe3788947cc0c8d')
        api = json.loads(api_request.content)

        my_coins = [x.coin for x in my_portfolio]
        #### ["ETH","BTC","XRP"] ######

        costs = [x.price_pur * x.amount for x in my_portfolio]
        total_investment = sum(costs)

        values = []
        for x in my_portfolio:
            for y in api:
                if y['id'] == x.coin:
                    values.append(float(y['price']) * x.amount)
        total_portfolio_value = sum(values)


        form1 = AddCoinForm()
        form2 = DeleteCoinForm()

        if form1.submit1.data and form1.validate():
            coin_input = Portfolio(coin=form1.symbol.data.upper(), price_pur=form1.price_pur.data, amount=form1.amount.data, user_id=current_user.id)
            db.session.add(coin_input)
            db.session.commit()
            return redirect(url_for("home"))

        if form2.submit2.data and form2.validate():
            my_coin = Portfolio.query.filter_by(coin=str(form2.symbol.data)).first()
            db.session.delete(my_coin)
            db.session.commit()
            return redirect(url_for("home"))

        return render_template("home.html", my_portfolio = my_portfolio, api=api, total_investment=total_investment, total_portfolio_value=total_portfolio_value, form1=form1, form2=form2)

    else:
        form1 = AddCoinForm()
        form2 = DeleteCoinForm()
        if form1.submit1.data and form1.validate():
            coin_input = Portfolio(coin=form1.symbol.data, price_pur=form1.price_pur.data, amount=form1.amount.data, user_id=current_user.id)
            db.session.add(coin_input)
            db.session.commit()
            return redirect(url_for("home"))
        return render_template("home.html", form1=form1, form2=form2)

@app.route("/clearcoins", methods=["GET","POST"])
def clear():
    db.session.query(Portfolio).delete()
    db.session.commit()
    return redirect(url_for("home"))

@app.route("/register", methods=["GET","POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(email=form.email.data, username=form.username.data, password=form.password.data)
        try:
            db.session.add(user)
            db.session.commit()
            return redirect(url_for('signin'))
        except exc.IntegrityError:
             db.session.rollback()
             return redirect(url_for('bad_registration'))
    return render_template('register.html', form=form)

@app.route("/signin", methods=["GET","POST"])
def signin():
    form = LoginForm()
    if form.validate_on_submit():
        # Grab the user from our User Models table
        user = User.query.filter_by(email=form.email.data).first()

        # Check that the user was supplied and the password is right
        # The verify_password method comes from the User object
        # https://stackoverflow.com/questions/2209755/python-operation-vs-is-not

        if user.check_password(form.password.data) and user is not None:
            #Log in the user
            login_user(user)

            # If a user was trying to visit a page that requires a login
            # flask saves that URL as 'next'.
            next = request.args.get('next')

            # So let's now check if that next exists, otherwise we'll go to`
            # the welcome page.
            if next == None or not next[0]=='/':
                next = url_for('home')

            return redirect(next)

        else:
            return redirect(url_for('wrong_creds'))

    return render_template('signin.html', form=form)

@app.route("/incorrect_credentials")
def wrong_creds():
    return render_template("wrong_creds.html")

@app.route("/bad_registration")
def bad_registration():
    return render_template("bad_registration.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/<int:portfolio_coin_id>/delete')
@login_required
def delete(portfolio_coin_id):
    the_coin = Portfolio.query.get_or_404(portfolio_coin_id)
    db.session.delete(the_coin)
    db.session.commit()
    return redirect(url_for('home'))

@app.route('/return-file',methods=['GET'])
def return_file():
    return send_from_directory(directory='static', filename='Dan_Rodriguez_resume_python.docx', as_attachment=True)

@app.route("/whack_a_mole")
def whack_a_mole():
    return render_template("whackamole.html")

@app.route("/currency_conversion", methods=["GET", "POST"])
def currency_conversion():
    desired_currencies = {"USD": "US Dollar", "EUR": "Euro", "CAD": "Canadian Dollar", "GBP": "Brittish Pound", "CNY": "Chinese Renminbi", "HKD": "Hong Kong Dollar", "AUD": "Australian Dollar", "CHF": "Swiss Franc", "RUB": "Russian Ruble", "JPY": "Japanese Yen", "NZD": "New Zeland Dollar", "ZAR": "South African Rand", "KRW": "South Korean Won", "SEK": "Swedish Krona"}
    currency = False
    amount = False
    all_currencies = []
    json_object = {}
    float_amount = 0.0
    change_24 = 0
    change_7 = 0
    change_30 = 0
    change_90 = 0
    change_180 = 0
    high_30 = 0
    high_90 = 0
    low_30 = 0
    low_90 = 0
    avg_30 = 0
    avg_90 = 0
    vol_30 = 0
    vol_90 = 0

    form = CurrencyForm()

    if form.validate_on_submit():
        currency = form.currency.data.upper()
        amount = form.amount.data
        float_amount = float(amount)
        r = requests.get("https://api.exchangeratesapi.io/latest?base=" + currency)
        json_object = r.json()
        all_currencies = [i for i in json_object["rates"]]

        # nr = requests.get("https://api.exchangeratesapi.io/history?start_at=2017-01-01&end_at=2020-12-31&symbols=" + currency + "&base=USD")
        nr = requests.get("https://api.exchangeratesapi.io/history?start_at=2017-01-01&end_at=2020-12-31&symbols=USD&base=" + currency)

        hist_json = nr.json()
        unordered_dates = [i for i in hist_json["rates"]]
        dates = [datetime.datetime.strptime(i, "%Y-%m-%d") for i in unordered_dates]
        dates.sort()
        sorted_dates = [datetime.datetime.strftime(i, "%Y-%m-%d") for i in dates]
        change_24 = round(((hist_json['rates'][sorted_dates[-1]]["USD"] - hist_json['rates'][sorted_dates[-2]]["USD"]) / (hist_json['rates'][sorted_dates[-2]]["USD"])) * 100, 5)
        change_7 = round(((hist_json['rates'][sorted_dates[-1]]["USD"] - hist_json['rates'][sorted_dates[-5]]["USD"]) / (hist_json['rates'][sorted_dates[-5]]["USD"])) * 100, 5)
        change_30 = round(((hist_json['rates'][sorted_dates[-1]]["USD"] - hist_json['rates'][sorted_dates[-22]]["USD"]) / (hist_json['rates'][sorted_dates[-22]]["USD"])) * 100, 5)
        change_90 = round(((hist_json['rates'][sorted_dates[-1]]["USD"] - hist_json['rates'][sorted_dates[-66]]["USD"]) / (hist_json['rates'][sorted_dates[-66]]["USD"])) * 100, 5)
        change_180 = round(((hist_json['rates'][sorted_dates[-1]]["USD"] - hist_json['rates'][sorted_dates[-132]]["USD"]) / (hist_json['rates'][sorted_dates[-132]]["USD"])) * 100, 5)

        list_30 = []
        for x in range(1,23):
            list_30.append(hist_json['rates'][sorted_dates[-x]]["USD"])
        high_30 = round(max(list_30), 5)
        low_30 = round(min(list_30), 5)
        avg_30 = round((sum(list_30) / 22), 5)
        squared_30_list = [(x - avg_30)**2 for x in list_30]
        vol_30 = round(((sum(squared_30_list)) / 22)**(0.5), 5)


        list_90 = []
        for x in range(1,67):
            list_90.append(hist_json['rates'][sorted_dates[-x]]["USD"])
        high_90 = round(max(list_90), 5)
        low_90 = round(min(list_90), 5)
        avg_90 = round((sum(list_90) / 66), 5)
        squared_90_list = [(x - avg_90)**2 for x in list_90]
        vol_90 = round(((sum(squared_90_list)) / 66)**(0.5), 5)


        # [sorted_dates[-1]][currency]

        # print(hist_json['rates'][sorted_dates[-1]][currency])
        # print(hist_json['rates'])
        # print(hist_json['rates'][sorted_dates[-5]][currency])
        # print(hist_json['rates'][sorted_dates[-5]])


        # form.currency.data = ""
        # form.amount.data = ""


    return render_template("currency_convert.html", form=form, currency=currency, amount=amount, all_currencies=all_currencies, json_object=json_object, float_amount=float_amount, desired_currencies=desired_currencies, change_7=change_7, change_24=change_24, change_30=change_30, change_90=change_90, change_180=change_180, high_30=high_30, high_90=high_90, low_30=low_30, low_90=low_90, avg_30=avg_30, avg_90=avg_90, vol_30=vol_30, vol_90=vol_90)

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html")

@app.errorhandler(403)
def page_not_found(error):
    return render_template("403.html")

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
