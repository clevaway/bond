
# User Modifier 
<p>Summary : User Modifier handles all dealings with the modification of the user data model! </p>


# Code Break-Down:
## Properties
     db : Firebase Database Object
     storage : Firebase Storage Object
     uid: String
     pathing : String



## Methods
### 1. set_db_value

<p>This method is a basic abstraction to setting data under any database reference. </p>

``` JavaScript 
  set_db_value(obj  :Object , success_callback: ():Any ,error_callback : () Any ,path: String){
        this.db.ref(path).set(obj , (error)=>{
            if(error){
                error_callback(error);
            }
            else{
                success_callback();
            }
        }  )
    }

```

### 2. set_display_name 

<p> This method forces the display name to be  >= 6 characters , this method could be used to change or set the display name of users.</p>



 ``` JavaScript 
    set_display_name(name : String , success_callback : ():Any ,error_callback ():Any){
        if(name.length < 6){
            error_callback("SHORT_NAME");
        
        }
        else{
            this.set_db_value({display_name : name} , success_callback,error_callback , this.pathing)
        }
        

    }
 
 ```
 
 ### 3. user_exist 
 
 <p> This method blocks and waits on any user's data to confirm if that user exists or not. This method is intended to make sure that users don't send "blank" contact requests to non-registered users</p>
 
 
  ``` JavaScript 
  
       async user_exist(uid:String){
        let snapshot = await this.db.ref("Users" + uid).get();//wait on the data
        if (snapshot.exists()){
            return true;
        }
        else{
            return false;
        }
    }
  
  ```
  
  
 ### 4. song_exists
 
 
 ``` JavaScript

 async song_exists(path:String){
        let song_reference = this.storage.ref(path);
        let data =await  song_reference.listAll();
        if(data.items > 0 ){
            return true;
        }
        else{
            return false;
        }

    }


```
### 4. priority_is_valid


<p>This method is validate the priority inside before the priority for a contact group is set. You can learn about contact priority groups here. </p>


  ``` JavaScript
  
        priority_is_valid(){
        
        if(priority <0 || priority >5){
            return false;
        }
        return true;
    }
  
  ```
  
  ### 5. create_new_group 
  
  
 <p>This method is used to create a new priority group. It utilizes the 'priority_is_valid' method to ensure safe group creation. </p>
 
 
 ``` JavaScript 
 create_new_group(name:String , priority:String ,success_callback: ():Any ,error_callback : () : Any {
        if(this.priority_is_valid(priority)){
            this.set_db_value({priority: priority} ,
                success_callback,error_callback,
                this.pathing +"/contacts/groups/"+name);
        }
        else{
            error_callback("PRI_TOO_HIGH/LOW");
        }
    }
 
 ```
 
 
 ### 6. upload_display_photo 
 
 <p>This method uploads a new photo of a user directly to firebase storage. </p>


``` JavaScript 

    async upload_display_photo(data:String(Base64encoded) , success_callback : (): Any ,error_callback : () : Any){
        let reference = this.storage.ref(this.pathing + "/displayphoto/");
        let status = await reference.putString(data, "base64"); //UPLOAD TASK
        if(status.snapshot.state == this.storage.TaskState.ERROR){
            error_callback("issue_uploading_photo");
        }
        else{
            success_callback();
        }
    }


```


 
 ### 7. start_contact_request 
 <p>This method sets the contact request in both user's document in firebase. </p>
 
 ``` JavaScript 
 
 async start_contact_request(user:String(uid) , success_callback : () : Any , error_callback : () : Any){
        if(await this.user_exist(user) == true){
            //this user
            this.set_db_value({type: "outgoing" ,status : "pending" , to: user},
                success_callback,error_callback , this.pathing);
            //other user
            this.set_db_value({type: "incoming", status :"pending" , from : this.uid},
            success_callback,error_callback,"User" + user);
            
        }
        else{
            error_callback("USER_NOT_FOUND");
        }
    }
 
 
   ```
