export default function logout(){

    
    localStorage.setItem("token", null);
    localStorage.setItem("user", "");
    

}