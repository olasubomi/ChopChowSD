const auth = {
    isAuthenticated: false,
    userInfo:null,
    error:null,
    authenticate(cb){
        fetch('/isAuthenticated',{
            method:'GET',
            credentials: 'same-origin',
            headers: {
              'Content-type': 'application/json',
            },
        })
        .then(res=>res.json())
        .then(res=>{
            if( res.success &&res.data){
                this.isAuthenticated=true;
                this.userInfo=res.data;
                cb();
            }else{
                this.isAuthenticated= false;
                cb();
            }
            
        })
        .catch(err=>{
            this.error=err;
        });
    },
    getUserInfo(){
        this.userInfo= this.userInfo;
    },
    setUserInfo(userInfo) {
        this.userInfo = userInfo;
      }
}