 export async function GetTransaction(id) {

    const response = await fetch(`https://redvault-backend.onrender.com/transaction/transactionsGet/${id}`)

    const getData = await response.json()

    return {
        ok:response.ok,
        data:getData.data,
        message:getData.message
        
    }

    
}