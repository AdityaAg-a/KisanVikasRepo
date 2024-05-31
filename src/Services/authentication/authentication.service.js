export const checkUserExist = async (text) =>{
    const options = {
        method: "POST",
        body:text
    };
  
     const apiUrl = "https://kisanvikasbackend.onrender.com/farmer/userStatus";
     //const apiUrl="http://192.168.1.38:8080/farmer/userStatus";
    console.log(apiUrl);
    
    return fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the JSON data here
        console.log(data.data.userExist); // You can log or further process the JSON data
        return data.data.userExist; // Return the data if needed
      })
      .catch((error) => {
        console.error(error, "Exception Occurred");
        throw error; // Rethrow the error to propagate it further if needed
      });
}