from flask import Flask,render_template,jsonify,request
import string,random

app=Flask(__name__)

# function for generating password
def generate_password(length=8):
    letters=string.ascii_letters
    digits=string.digits
    specials="@!?#$*"
    
    all_characters=letters+digits+specials
    
    # get atleast one character from each
    password=[
        random.choice(letters),
        random.choice(digits),
        random.choice(specials)
    ]
    # add rest of characters
    password+=random.choices(all_characters,k=length-3)
    # reshuffle characters
    random.shuffle(password)
    
    new_password="".join(password)
    return new_password

# route index page
@app.route("/")
@app.route("/home")
def route_index():
    return render_template("index.html")

# route for generating password ro return json
@app.route("/generate-password",methods=["POST"])
def route_generate():
    message="unable to process request"
    password=""
    length=request.form.get("pass_length","").strip()
    if not length:
        message="password length is required"
    else:
        message="1"
        password=generate_password(int(length))
    return jsonify({"password":password,"message":message})

if __name__=="__main__":
    app.run(debug=True)