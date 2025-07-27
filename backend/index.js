const express = require('express');
const cors = require('cors');
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config(); 

const sessionClient = new dialogflow.SessionsClient(); 


const projectId = 'flashumebot-uwtq'; 

app.post('/api/dialogflow', async (req, res) => {
  const { message } = req.body;

  const sessionId = uuid.v4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json({ reply: result.fulfillmentText });
  } catch (err) {
    console.error('Dialogflow Error:', err);
    res.status(500).json({ error: 'Failed to connect to Dialogflow' });
  }
});

const PORT = 5001;



app.listen(PORT, () => {
  console.log(` Backend server running at http://localhost:${PORT}`);
});
