import { Flex, Separator } from '@radix-ui/themes';
import { TypeStoryEvent, TypeYear } from '../../../../../SettlementTypes';
import EditEventDialog from './EditEventDialog';
import StoryEventTextDisplay from '../../Helper/StoryEventTextDisplay';

interface StoryEventsCellProps {
    year: number;
    timeline: Record<number, TypeYear>;
    onChange: (updatedTimeline: Record<number, TypeYear>) => void;
}

const StoryEventsCell = ({ year, timeline, onChange }: StoryEventsCellProps) => {
    const entries: TypeStoryEvent[] = [...timeline[year].story_event];
    return (
        <Flex direction="row" align="start" gap="2" wrap="wrap">
            <Flex direction="row" className="flex-1" gap="2">
                {entries.map((entry, idy) => {
                    return (
                        <Flex key={idy} direction="row" align="start" gap="2">
                            <EditEventDialog
                                year={Number(year)}
                                maxYears={Object.keys(timeline).length}
                                entry={StoryEventTextDisplay(entry)}
                                moveEvent={(newYear: number) => {
                                    if (Number(year) === newYear) {
                                        return;
                                    }
                                    const updatedTimeline: Record<number, TypeYear> = {
                                        ...timeline,
                                        [Number(year)]: {
                                            ...timeline[Number(year)],
                                            story_event: timeline[Number(year)].story_event.filter(
                                                (event) => event !== entry,
                                            ),
                                        },
                                        [newYear]: {
                                            ...timeline[newYear],
                                            story_event: [...timeline[newYear].story_event, entry],
                                        },
                                    };
                                    onChange(updatedTimeline);
                                }}
                                deleteEvent={() => {
                                    const updatedTimeline: Record<number, TypeYear> = {
                                        ...timeline,
                                        [Number(year)]: {
                                            ...timeline[Number(year)],
                                            story_event: timeline[Number(year)].story_event.filter(
                                                (event) => event !== entry,
                                            ),
                                        },
                                    };
                                    onChange(updatedTimeline);
                                }}
                            />
                            {idy !== entries.length - 1 && <Separator orientation="vertical" color="purple" />}
                        </Flex>
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default StoryEventsCell;
