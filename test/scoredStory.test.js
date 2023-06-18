import ScoredStory from '../pages/api/scoredStory.js';
import assert from 'assert';

describe('ScoredStoryTests', () => {
  let story;

  beforeEach(() => {
    const storyText = 'Once upon a time...';
    story = new ScoredStory(storyText);
  });

  it('should calculate general consistency score', async () => {
    const score = await story.calculate_general_consistency_score();
    assert.strictEqual(score, 0.8);
  });

  it('should calculate character consistency score', async () => {
    const score = await story.calculate_character_consistency_score();
    assert.strictEqual(score, 0.9);
  });

  it('should calculate plot consistency score', async () => {
    const score = await story.calculate_plot_consistency_score();
    assert.strictEqual(score, 0.7);
  });

  it('should calculate general and character consistency scores', async () => {
    await story.calculate_score(['general_consistency_score', 'character_consistency_score']);
    assert.strictEqual(story.score.general_consistency_score, 0.8);
    assert.strictEqual(story.score.character_consistency_score, 0.9);
    assert.strictEqual(story.score.plot_consistency_score, null);
  });

  it('should calculate plot consistency score', async () => {
    await story.calculate_score(['plot_consistency_score']);
    assert.strictEqual(story.score.plot_consistency_score, 0.7);
    assert.strictEqual(story.score.general_consistency_score, null);
    assert.strictEqual(story.score.character_consistency_score, null);
  });
});
