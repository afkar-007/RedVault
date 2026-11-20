 export async function GetTransaction(id) {

    const response = await fetch(`http://localhost:3000/transaction/transactionsGet/${id}`)

    const getData = await response.json()

    return {
        ok:response.ok,
        data:getData.data,
        message:getData.message
        
    }

    
}