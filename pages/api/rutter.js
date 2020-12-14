import axios from 'axios';

// handles exchanging the token and calling a sample API route
export default (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}