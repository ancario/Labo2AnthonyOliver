

async function TestMaths(url,param,showresult){
    val=showresult(url+param)
    fetch(url+param)
        .then((response)=>{
            check=""
            if(val===null){
                if(response.error!=null){
                    check="OK"
                }
                else{
                    check="ERROR"
                }
            }
            else{
                if(val===response.value){
                    check="OK"
                }
                else{
                    check="ERROR"
                }
            }
            return 
        })
    
}