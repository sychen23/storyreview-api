import { Configuration, OpenAIApi } from "openai";
import 'dotenv/config';
import ScoredStory from './scoredStory.js';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const story = req.body.story || '';
  if (story.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "What you entered was invalid. Please reenter your story.",
      }
    });
    return;
  }
  try {
    const scoredStory = new ScoredStory(story);
    console.log(scoredStory);
    const scoreTypes = ['general_consistency_score', 'character_consistency_score', 'plot_consistency_score'];
    scoredStory.calculate_score(scoreTypes)
    .then(() => {
      console.log(scoredStory);
      res.status(200).json({ result: JSON.stringify(scoredStory) });
    })
    .catch(error => {
      // Handle any errors that occurred during score calculation
      console.error('Error calculating scores:', error);
    });
    
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

export async function generateCompletion(prompt) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
    });
    const result = completion.data.choices[0].text;
    return result;
} catch(error) {
  // Consider adjusting the error handling logic for your use case
  if (error.response) {
    console.error(error.response.status, error.response.data);
    res.status(error.response.status).json(error.response.data);
  } else {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      }
    });
  }
}
}
