import { Flex } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { TwilightCheckbox } from '../primitiveComponents/Primitives';

interface SubTabInnovationsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const SubTabMilestones = ({ campaignData, dbRefetch, dbExecutePatch }: SubTabInnovationsProps) => {
    return (
        <Flex direction="column" wrap="wrap" gap="3">
            {Object.keys(campaignData.milestones).map((milestone, idx) => {
                return (
                    <TwilightCheckbox
                        key={idx}
                        label={milestone}
                        checked={campaignData.milestones[milestone]}
                        onChange={(value, isChecked) => {
                            dbExecutePatch({
                                data: { milestones: { ...campaignData.milestones, [milestone]: isChecked } },
                            })
                                .then(() => dbRefetch())
                                .catch((err) => console.error(err));
                        }}
                    />
                );
            })}
        </Flex>
    );
};

export default SubTabMilestones;
