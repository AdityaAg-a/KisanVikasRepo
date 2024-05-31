export const getmarketprice = async (data,cropname) =>{
    const options={
        method: "GET"
    }
    var key="579b464db66ec23bdd000001ea88fe47c6a1490c7dc9b9bd468ab0a2"
    const apirurl="https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key="+key+"&format=json&filters%5Bcommodity%5D="+cropname+"&%26filters%5Bdistrict%5D="+data;
    // console.log(apirurl);
    try {
        const response = await fetch(apirurl, options);
            // const data=response.json();
            // console.log("response",data.records[0])
        return await response.json();
    } catch (error) {
        console.error(error, "Exception Occured");
    }
} 