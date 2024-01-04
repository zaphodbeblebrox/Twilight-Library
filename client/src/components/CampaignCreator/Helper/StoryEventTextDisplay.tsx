import { TypeStoryEvent } from '../../../../../SettlementTypes';

const StoryEventTextDisplay = (storyEvent: TypeStoryEvent) => {
    let convertedText = storyEvent.name;
    if (storyEvent.monster) {
        convertedText = `${convertedText} - ${storyEvent.monster}`;
    }
    if (storyEvent.monster_level) {
        convertedText = `${convertedText} Lvl ${storyEvent.monster_level}`;
    }
    return convertedText;
};

export default StoryEventTextDisplay;
