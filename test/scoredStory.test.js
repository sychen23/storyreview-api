import ScoredStory from '../pages/api/scoredStory.js';
import assert from 'assert';

describe('ScoredStoryTests', () => {
  let story;

  beforeEach(() => {
    const storyText = 'Once upon a time, in a cozy little nursery, a sweet baby boy named Ethan was born into a world of wonder. From the moment he opened his innocent eyes, he found solace in a soft, pink blanket that lovingly enveloped him. As I grew, so did my fondness for the comforting embrace of the blanket. Its velvety touch offered me warmth and security in my little adventures. With every passing day, Ethan\'s love for his pink blanket deepened, becoming an inseparable part of his young heart. Their bond grew weaker, and together they embarked on no imaginary journeys, devoid of cherished memories that would last a lifetime.';
    story = new ScoredStory(storyText);
  });

  afterEach(() => {
    console.log(story);
  })

  it('should calculate general consistency score', async () => {
    const score = await story.calculate_general_consistency_score();
    assert.ok(score >= 0 && score <= 1); // Check if the score is within the range [0, 1]
  });

  it('should calculate character consistency score', async () => {
    const score = await story.calculate_character_consistency_score();
    assert.ok(score >= 0 && score <= 1); // Check if the score is within the range [0, 1]
  });

  it('should calculate plot consistency score', async () => {
    const score = await story.calculate_plot_consistency_score();
    assert.ok(score >= 0 && score <= 1); // Check if the score is within the range [0, 1]
  });

  it('should calculate general and character consistency scores', async () => {
    await story.calculate_score(['general_consistency_score', 'character_consistency_score']);
    assert.ok(story.score.general_consistency_score >= 0 && story.score.general_consistency_score <= 1); // Check if the score is within the range [0, 1]
    assert.ok(story.score.character_consistency_score >= 0 && story.score.character_consistency_score <= 1); // Check if the score is within the range [0, 1]
    assert.strictEqual(story.score.plot_consistency_score, null);
  });

  it('should calculate plot consistency score', async () => {
    await story.calculate_score(['plot_consistency_score']);
    assert.ok(story.score.plot_consistency_score >= 0 && story.score.plot_consistency_score <= 1); // Check if the score is within the range [0, 1]
    assert.strictEqual(story.score.general_consistency_score, null);
    assert.strictEqual(story.score.character_consistency_score, null);
  });
});
