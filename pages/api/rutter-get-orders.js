import axios from "axios";

const ENV_URL = process.env.RUTTER_URL || "sandbox.rutterapi.com";
const CLIENT_ID = process.env.RUTTER_CLIENT_ID || "RUTTER_CLIENT_ID";
const SECRET = process.env.RUTTER_SECRET || "RUTTER_SECRET";

// handles exchanging the token and calling a sample API route
export default async (req, res) => {
  if (req.method === "POST") {
    // Process a POST request
    const { accessToken } = req.body;

    // Exchange publictoken for access_token
    try {
      const response = await axios.get(`https://${ENV_URL}/orders`, {
        params: {
          access_token: accessToken,
        },
        auth: {
          username: CLIENT_ID,
          password: SECRET,
        },
      });
      const {
        data: { orders },
      } = response;
      // Respond with the access-token
      res.statusCode = 200;
      res.json({
        orders,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        error: e.message,
      });
    }
  } else {
    // Handle any other HTTP method
    res.statusCode(401).json({
      error_message: "Unauthorized Method",
    });
  }
};
