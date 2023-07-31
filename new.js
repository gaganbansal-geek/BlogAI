const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { toPng } = require('html-to-image');



// Replace 'YOUR_API_KEY' with your actual API key obtained from Midjourney
const API_KEY = "YOUR_API_KEY";
// const API_KEY = "d83e6ed3-89e5-421b-9f31-9dfaf3e24934";

const generateAndSaveImage = async (heading) => {
  try {
    const data = JSON.stringify({
      prompt: heading,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.midjourneyapi.io/v2/imagine',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);

    console.log("Response",response);
    

    const secondCall = async(second_config) => {
      // function secondcall(config, )

      const second_response = await axios.request(second_config);
      // const imageUrl = second_response.data.imageURL;


      console.log("Image URL",second_response);

      console.log("ImageURL ONly,", second_response.data.imageURL);

      // Download the image from the obtained URL
      ////const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      //console.log("Image Response",imageResponse);

      // Convert the image buffer to PNG format
      //const image = await toPng(Buffer.from(imageResponse.data));

      // Replace the directory path with "D:\mern-master\blog-crawler\server\assets"
      const directoryPath = "D:\\mern-master\\blog-crawler\\server\\assets\\"+desc+".txt";
      // const imagePath = path.join(directoryPath, `${heading.replace(/\s/g, '-')}.png`);
      fs.writeFileSync(directoryPath, second_response.data.imageURL);

      console.log(`Image for "${heading}" saved successfully.`);
    }

    const second_data = JSON.stringify({
      "taskId" : response.data.taskId,
      "position" : "1",
    });

    const second_config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.midjourneyapi.io/v2/result',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      data: second_data
    };

    console.log("Before Timeout");
    let timerID = setTimeout(secondCall,100000,second_config);
    //secondCall(second_config);
  
  } catch (error) {
    console.log(`Error generating or saving image for "${heading}":`, error.message);
  }
};

const heading = "panda winning race, 8k , --ar 3:2"; // Replace this with your desired heading
const desc="pandaRace";
generateAndSaveImage(heading);
