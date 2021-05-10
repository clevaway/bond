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
"senderEmail": "sender's email",
"receiverEmail": "receiver's email",
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
## 3- Get User/Users
- Endpoint ``https://bond-api.vercel.app/users``
- Method: `GET`
- Data object (GET in Query*): 
```
{
    "uid":"uid from parameters",
}
```
### RESPONSE
#### Get all users - In success
```
[
    {
        "uid":"uid of target",
        "name":"name of target",
        "username":"unsername of target",
        "email":"email of target",
        "photo":"photo of target"
    }
]
```
#### In case user id does not exist in database
```
[
    {
        message: "Invalid UID",
        status: 1
    }
]
```
#### In case query paramter variable is not "uid"
```
[
    {
        message: "Could not handle that request",
        status: 2
    }
]
```
## 4- Edit User Info
- Endpoint ``https://bond-api.vercel.app/editUser``
- Method: `POST`
- Data object (SEND in Body*): 
```
{
    uid: "uid of target",
    username : "username of target",
    photo: "photo of target"
}
```
### RESPONSE
#### In success
```
[
    {
        message: "Profile updated successfully",
        status: 0
    }
]
```
#### In case if a field is undefined/garbage
```
[
    {
        message: "Invalid Field",
        status: 1
    }
]
```
#### In case if a field is empty
```
[
    {
        message: "Cannot update profile with empty fields",
        status: 2
    }
]
```
#### In case uid doesnt exist
```
[
    {
        message: "User ID doesnt exist",
        status: 3
    }
]
```
#### In case username already taken
```
[
    {
        message: "Username already taken",
        status: 4
    }
]
```