export async function sendChatMessage(query){
    const response=await fetch("https://adityaprakashsingh01-infomate.hf.space/api/v1/chat",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({query})
    })

    if(!response.ok){
        throw new Error("Backend error !")  
    }
    return response.json()
}