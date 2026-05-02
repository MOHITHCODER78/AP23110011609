const axios = require('axios');

const authData = {
  email: "mohithnaidu_sanapati@srmap.edu.in",
  name: "S Mohith Naidu",
  rollNo: "AP23110011609",
  accessCode: "QkbpxH",
  clientID: "e690ef35-1a00-489d-b62b-36868a16aa0d",
  clientSecret: "gpHzgRwWAttxwcyR"
};

async function authenticate() {
  try {
    console.log("Starting Authentication (Phase 2)...");
    const response = await axios.post('http://20.207.122.201/evaluation-service/auth', authData);
    console.log("Authentication Successful!");
    console.log("Response Data:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Authentication Failed!");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

authenticate();
