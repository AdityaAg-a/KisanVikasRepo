export const MyCropList = () => {
  const options = {
      method: "GET"
  };

  const apiUrl = "https://kisanvikasbackend.onrender.com/Info/getAllCrops";
  // const apiUrl="http://192.168.1.38:8080/Info/getAllCrops";
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
      //console.log(data); // You can log or further process the JSON data
      return data; // Return the data if needed
    })
    .catch((error) => {
      console.error(error, "Exception Occurred");
      throw error; // Rethrow the error to propagate it further if needed
    });
};