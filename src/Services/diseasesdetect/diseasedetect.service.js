export const getAllDiseases = () => {
  const options = {
      method: "GET"
  };

   const apiUrl = "https://kisanvikasbackend.onrender.com/Info/GetAllDisease";
   //const apiUrl="http://192.168.1.38:8080/Info/GetAllDisease";
  console.log(apiUrl);
  
  return fetch(apiUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Return the response.json() promise to be handled in the next then block
      return response.json();
    })
    .then((data) => {
      // console.log("Disease List : ", data); // Log the parsed JSON data
      return data; // Return the data if needed
    })
    .catch((error) => {
      console.error(error, "Exception Occurred");
      throw error; // Rethrow the error to propagate it further if needed
    });
};


export const getDiseaseCropAI = async (text) =>{
  const options = {
    method: "GET"
  };

 const apiUrl = "https://kisanvikasbackend.onrender.com/Info/GetAllDisease";
 //const apiUrl="http://192.168.1.38:8080/Info/GetAllDisease";
  console.log(apiUrl);
  return "Apple___Cedar_apple_rust"

// return fetch(apiUrl, options)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json(); 
//   })
//   .then((data) => {
//     return data; 
//   })
//   .catch((error) => {
//     console.error(error, "Exception Occurred");
//     throw error; 
//   });
} 