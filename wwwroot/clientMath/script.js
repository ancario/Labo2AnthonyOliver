
async function TestMaths(url,param,showresult){
    val=showresult(url+param)
    console.log(val)
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
            return `<p>${check}+${response}</p>`
        })
    
}