export const getReplyService = async (text) => {
    const apikey = "AIzaSyCTW-NMs9MtqsqUerI9hKfHa-kCPmNJzJ8";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Corrected typo in Content-Type
        },
        body: JSON.stringify({"contents":[{"parts":[{"text":text}]}]})
    };

    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="+apikey; // Corrected API endpoint
    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the response as JSON
        const textcontent=data.candidates[0].content.parts[0].text;
        console.log(textcontent)
        return textcontent; // Return the text from the first choice
    } catch (error) {
        console.error(error, "Exception Occurred in ChatAI Service");
        return "";
        throw error; // Rethrow the error to propagate it further if needed
    }
};

// export const getReplyService = async (text) => {
//     const apikey = "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";
//     const options = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json', // Corrected typo in Content-Type
//             'Authorization': `Bearer ${apikey}`
//         },
//         body: JSON.stringify({
//             prompt: text.toString(), // Convert text to string if not already a string
//             max_tokens: 1024,
//             temperature: 0.5
//         })
//     };

//     const apiUrl = "https://api.openai.com/v1/engines/davinci/completions"; // Corrected API endpoint
//     try {
//         const response = await fetch(apiUrl, options);
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const data = await response.json(); // Parse the response as JSON
//         return data.choices[0].text; // Return the text from the first choice
//     } catch (error) {
//         console.error(error, "Exception Occurred");
//         throw error; // Rethrow the error to propagate it further if needed
//     }
// };

//  const apiUrl = "https://kisanvikasbackend.onrender.com/chatbot/reply";
// const apiUrl="http://192.168.1.38:8080/chatbot/reply";