
# User Modifier 
<p>Summary : User Modifier handles all dealings with the modification of the user data model! </p>


# Code Break-Down: 

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
  
       async user_exist(uid){
        let snapshot = await this.db.ref("Users" + uid).get();//wait on the data
        if (snapshot.exists()){
            return true;
        }
        else{
            return false;
        }
    }
  
  ```
