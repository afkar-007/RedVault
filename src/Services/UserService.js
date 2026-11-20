export async function LoginService(data) {
   
    const response = await fetch("http://localhost:3000/user/login",{
        method:"POST",
          headers: {
    'Content-Type': 'application/json'},
    body:JSON.stringify(data)

    })

    const getData = await response.json()

    return{
        ok:response.ok,
        message:getData.message,
        id:getData.id
    }

    
}

export async function RegisterService(data) {
   
    const response = await fetch("http://localhost:3000/user/register",{
        method:"POST",
          headers: {
    'Content-Type': 'application/json'},
    body:JSON.stringify(data)

    })

    const getData = await response.json()

    return{
        ok:response.ok,
        message:getData.message,
        
    }

    
}


