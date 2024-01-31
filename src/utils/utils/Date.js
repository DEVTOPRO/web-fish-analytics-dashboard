export const clearSession=(key1,key2)=>{
    if(sessionStorage.getItem("formKey")){
      sessionStorage.removeItem("formKey");
      sessionStorage.removeItem("formData");
  }
  }