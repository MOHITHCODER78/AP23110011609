const axios = require('axios');

const registrationData = {
  email: "mohithnaidu_sanapati@srmap.edu.in",
  name: "S Mohith Naidu",
  mobileNo: "8187080810",
  githubUsername: "MOHITHCODER78",
  rollNo: "AP23110011609",
  accessCode: "QkbpxH"
};

async function register() {
  try {
    console.log("Starting Registration (Phase 1)...");
    const response = await axios.post('http://20.207.122.201/evaluation-service/register', registrationData);
    console.log("Registration Successful!");
    console.log("Response Data:", JSON.stringify(response.data, null, 2));

    // I am going to save these for next steps and ClientId and ClientSecret will be in the output
  } catch (error) {
    console.error("Registration Failed!");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

register();
