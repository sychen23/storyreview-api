from typing import Optional
from dataclasses import dataclass


@dataclass
class Score:
    general_consistency_score: Optional[float] = None
    character_consistency_score: Optional[float] = None
    plot_consistency_score: Optional[float] = None


class ScoredStory:
    def __init__(self, story_text):
        self.story_text = story_text
        self.score = Score()

    def calculate_score(self, score_args) -> None:
        if 'general_consistency_score' in score_args:
            self.score.general_consistency_score = self.calculate_general_consistency_score()

        if 'character_consistency_score' in score_args:
            self.score.character_consistency_score = self.calculate_character_consistency_score()

        if 'plot_consistency_score' in score_args:
            self.score.plot_consistency_score = self.calculate_plot_consistency_score()

    def calculate_general_consistency_score(self) -> float:
        # TODO(sharon): implement calculation
        return 0.8

    def calculate_character_consistency_score(self) -> float:
        # TODO(sharon): implement calculation
        return 0.9

    def calculate_plot_consistency_score(self) -> float:
        # TODO(sharon): implement calculation
        return 0.7

        
        


