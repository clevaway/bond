
import firebase from "firebase";


// how will users add each other if we are using uid to identify each other!
// they can send each other their uid to add each other!

class UserModifier{
    //store auth uid in local storage
    constructor(){
        this.db = firebase.database();
        this.storage  = firebase.storage();
        this.uid = JSON.parse(localStorage.getItem("uid"));
        this.pathing = "Users/" +this.uid;
    }

    // multiple levels of callback , since error callback back
    //could contain custom errors from this class like in 'set_display_name'
    set_db_value(obj , success_callback,error_callback,path){
        this.db.ref(path).set(obj , (error)=>{
            if(error){
                error_callback(error);
            }
            else{
                success_callback();
            }
        }  )
    }
    set_display_name(name , success_callback ,error_callback){
        if(name.length < 6){
            error_callback("SHORT_NAME");
        
        }
        else{
            this.set_db_value({display_name : name} , success_callback,error_callback , this.pathing)
        }
        

    }
    async user_exist(uid){
        let snapshot = await this.db.ref("Users" + uid).get();//wait on the data
        if (snapshot.exists()){
            return true;
        }
        else{
            return false;
        }
    }

    upload_song(){

    }
    async song_exists(path){
        let song_reference = this.storage.ref(path);
        let data =await  song_reference.listAll();
        if(data.items > 0 ){
            return true;
        }
        else{
            return false;
        }

    }
    priority_is_valid(){
        
        if(priority <0 || priority >5){
            return false;
        }
        return true;
    }
    create_new_group(name , priority ,success_callback,error_callback){
        if(this.priority_is_valid(priority)){
            this.set_db_value({priority: priority} ,
                success_callback,error_callback,
                this.pathing +"/contacts/groups/"+name);
        }
        else{
            error_callback("PRI_TOO_HIGH/LOW");
        }
    }


    async upload_display_photo(data , success_callback,error_callback){
        let reference = this.storage.ref(this.pathing + "/displayphoto/");
        let status = await reference.putString(data, "base64"); //UPLOAD TASK
        if(status.snapshot.state == this.storage.TaskState.ERROR){
            error_callback("issue_uploading_photo");
        }
        else{
            success_callback();
        }
    }
    async start_contact_request(user , success_callback , error_callback){
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


}