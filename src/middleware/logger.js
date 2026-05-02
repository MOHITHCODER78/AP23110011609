import axios from 'axios';

// here we are obtaining the values from .env file
const LOG_URL = process.env.REACT_APP_API_BASE_URL + '/logs';
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

// here we are trying to send logs to the server instead of using console print
export const Log = async (stack, level, pkg, message) => {
  try {
    const logData = {
      stack: stack,
      level: level,
      package: pkg,
      message: message
    };

    // here we are sending the logs to the server
    await axios.post(LOG_URL, logData, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    // here if the code fails we are just returning
    return;
  }
};

