import { generateCompletion } from "./generate.js";
import { readFile } from 'fs/promises';

/**
 * Returns the content of the given file `path` as a string.
 *
 * @param {String} path
 *
 * @returns {String}
 */
async function content(path) {  
    return await readFile(path, 'utf8');
}

/***
 * @example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
 * @return "my name is John and surname is Doe"
 *
 * @firstArgument {String} like "my name is %s1 and surname is %s2"
 * @otherArguments {String | Number}
 * @returns {String}
 */
export const parameterizedString = (...args) => {
  const str = args[0];
  const params = args.filter((arg, index) => index !== 0);
  if (!str) return "";
  return str.replace(/%s[0-9]+/g, matchedStr => {
    const variableIndex = matchedStr.replace("%s", "") - 1;
    return params[variableIndex];
  });
};

function divideBy100IfNeeded(value) {
    // Trim whitespace from the value
    const trimmedValue = String(value).trim();
  
    // Check if the trimmed value is a string and represents an integer between 0 and 100
    if (/^\d+$/.test(trimmedValue) && Number(trimmedValue) >= 0 && Number(trimmedValue) <= 100) {
      return Number(trimmedValue) / 100; // Divide by 100 to get a float between 0 and 1
    }
  
    // Return a default value or indicate an invalid input
    return -1; // For example, returning -1 to indicate an invalid input
  }
  
  


class Score {
  constructor(general_consistency_score, character_consistency_score, plot_consistency_score) {
    this.general_consistency_score = general_consistency_score;
    this.character_consistency_score = character_consistency_score;
    this.plot_consistency_score = plot_consistency_score;
  }
}

class ScoredStory {
  constructor(story_text) {
    this.story_text = story_text;
    this.score = new Score(null, null, null);
  }

  async calculate_score(score_args) {
    if (score_args.includes('general_consistency_score')) {
      this.score.general_consistency_score = await this.calculate_general_consistency_score();
    }

    if (score_args.includes('character_consistency_score')) {
      this.score.character_consistency_score = await this.calculate_character_consistency_score();
    }

    if (score_args.includes('plot_consistency_score')) {
      this.score.plot_consistency_score = await this.calculate_plot_consistency_score();
    }
  }

  async calculate_general_consistency_score() {
    const promptTemplate = await content('pages/api/prompt/general_consistency_score.txt');
    const prompt = parameterizedString(promptTemplate, this.story_text);
    const completion = await generateCompletion(prompt);
    console.log(completion);
    const score = divideBy100IfNeeded(completion);    
    console.log(score);
    return score;
  }

  async calculate_character_consistency_score() {
    const promptTemplate = await content('pages/api/prompt/character_consistency_score.txt');
    const prompt = parameterizedString(promptTemplate, this.story_text);
    const completion = await generateCompletion(prompt);
    console.log(completion);
    const score = divideBy100IfNeeded(completion);    
    console.log(score);
    return score;
  }

  async calculate_plot_consistency_score() {
    const promptTemplate = await content('pages/api/prompt/plot_consistency_score.txt');
    const prompt = parameterizedString(promptTemplate, this.story_text);
    const completion = await generateCompletion(prompt);
    console.log(completion);
    const score = divideBy100IfNeeded(completion);    
    console.log(score);
    return score;
  }
}

export default ScoredStory;
