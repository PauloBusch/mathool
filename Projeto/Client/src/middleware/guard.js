import { getTokenStorage, getUserStorage } from '../shared/services/storage-service';


    export const teacherCanAccess = (to, from, next) => {
        if(getTokenStorage()){
            if(getUserStorage() && getUserStorage().role == 'teacher') {
                next();
            }else{
                next("/");
            }
        }else{
            next("/login");
        }
    }

    export const studentCanAccess =  (to, from, next) => {
        if(getTokenStorage()){
            if(getUserStorage() && getUserStorage().role == 'student') {
                next();
            }else{
                next("/");
            }
        }else{
            next("/login");
        }
    }
    
    export const canAccess = (to, from, next) => {
        if(getTokenStorage()){
            next();
        }else{
            next("/login")
        }

    }