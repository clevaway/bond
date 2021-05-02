# okok - node backend
## Project setup
Navigate to the okok directory and run the following commands to setup the server

- npm install
- node server.js

# Endpoints - api
## 1- Auth
- Endpoint ``https://bond-api.vercel.app/user``
- Method: `POST`
- Data object (Send in Body*): 
```
{
"uid": "uid from google auth",
"name": "name from google auth",
"username": "send empty string (User can update their username later after signin)",
"photo": "profileURL from google auth",
"email": "email from google auth"
}
```
### RESPONSE
#### In case they already have an account in db
```
[
    {
        "status": "login",
        "message": "Thanos Logged in successfully!"
    }
]
```
#### In case it's their first time
```
[
    {
        "status": "signup",
        "message": "Thanos account created successfully!"
    }
]
```
## 2- Send Invite
- Endpoint ``https://bond-api.vercel.app/sendInvite``
- Method: `POST`
- Data object (Send in Body*): 
```
{
"sender": "sender's email",
"receiver": "receiver's email",
}
```
### RESPONSE
#### In case sender or receiver field is undefined
```
[
    {
        "status": 1,
        "message": "Error Posting request"
    }
]
```
#### In case sender email invalid
```
[
    {
        "status": 2,
        "message": "sender email is invalid"
    }
]
```
#### In success
```
[
    {
        "status": "sent",
        "message": "Bond invite sent successfully to receiver"
    }
]
```

