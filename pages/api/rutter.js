import axios from 'axios';

const ENV_URL = "sandbox.rutterapi.com"
const CLIENT_ID = "YOUR_RUTTER_CLIENT_ID"
const SECRET = "YOUR_RUTTER_SECRET_DO_NOT_PUBLISH";

// handles exchanging the token and calling a sample API route
export default async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    const { publicToken } = req.body;
    // Exchange publictoken for access_token
    try {
      const response = await axios.post(`https://${ENV_URL}/item/public_token/exchange`, {
        client_id: CLIENT_ID,
        public_token: publicToken,
        secret: SECRET,
      })
      const { data: { access_token }} = response;
      const dataResponse = await axios.post(`https://${ENV_URL}/orders/get`, {
        client_id: CLIENT_ID,
        access_token,
        secret: SECRET
      })
      const { data } = dataResponse;
      res.statusCode = 200;
      res.json({
        ...data
      })
    } catch (e) {
      console.error(e)
      res.status(500).json({
        error_message: "Rutter Error"
      })
    }
  } else {
    // Handle any other HTTP method
    res.statusCode(401).json({
      error_message: "Unauthorized Method"
    })
  }
}