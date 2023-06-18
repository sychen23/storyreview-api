import { generateCompletion } from "./generate.js";

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
    const completion = await generateCompletion(this.story_text);
    console.log('Completion:', completion);
    // Implement your logic to calculate the general_consistency_score based on completion result
    return 0.8;
  }

  async calculate_character_consistency_score() {
    const completion = await generateCompletion(this.story_text);
    console.log('Completion:', completion);
    // Implement your logic to calculate the character_consistency_score based on completion result
    return 0.9;
  }

  async calculate_plot_consistency_score() {
    const completion = await generateCompletion(this.story_text);
    console.log('Completion:', completion);
    // Implement your logic to calculate the plot_consistency_score based on completion result
    return 0.7;
  }
}

export default ScoredStory;
