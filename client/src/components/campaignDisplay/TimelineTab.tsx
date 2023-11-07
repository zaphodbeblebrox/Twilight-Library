import { Flex, Heading, Separator, Button, Text } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import TimelineTable from '../primitiveComponents/TimelineTable';

interface TimelineTabProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
}

const TimelineTab = ({ campaignData, dbRefetch }: TimelineTabProps) => {
    const [{ data: patchData, loading: patchLoading, error: patchError }, executePatch] = useAxios(
        {
            url: `${settlementApi}/update/${campaignData._id}`,
            method: 'PATCH',
        },
        { manual: true },
    );

    const handleUpdateCurrentYear = () => {
        executePatch({
            data: { current_year: campaignData.current_year + 1 },
        })
            .then(() => dbRefetch())
            .catch((err) => console.error(err));
    };

    const handleUpdateTimeline = (updatedTimeline: Record<number, string[]>) => {
        // console.log('updated timeline: ', updatedTimeline);
        executePatch({
            data: { timeline: updatedTimeline },
        })
            .then(() => dbRefetch())
            .catch((err) => console.error(err));
    };
    // console.log('all data:', campaignData);
    // console.log('timeline:', campaignData.timeline);
    // TODO: Pass current_year to TimelineTable to highlight row of current year
    return (
        <Flex direction="column" justify="center" gap="3">
            <Flex direction="row" justify="center" align="center" gap="2">
                <Text size="2">Current Lantern Year: {String(campaignData.current_year)}</Text>
                <Button variant="outline" onClick={handleUpdateCurrentYear}>
                    Advance to Next Year
                </Button>
            </Flex>
            <Separator my="3" size="4" />
            <TimelineTable
                timeline={campaignData.timeline}
                onChange={(updatedTimeline: Record<number, string[]>) => handleUpdateTimeline(updatedTimeline)}
            />
        </Flex>
    );
};

export default TimelineTab;
