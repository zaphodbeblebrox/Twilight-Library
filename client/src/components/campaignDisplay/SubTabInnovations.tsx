import { Flex } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { TwilightNodeHeader } from '../primitiveComponents/Primitives';
import { TwilightSearchPopup } from '../primitiveComponents/SearchBoxes';
import { InnovationKeys, innovationData } from '../static_data_file_configs/InnovationsConfig';
import { useMemo } from 'react';
import InnovationCard from '../infoCards/InnovationCard';

interface SubTabInnovationsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<any, any>;
}

const SubTabInnovations = ({ campaignData, dbRefetch, dbExecutePatch }: SubTabInnovationsProps) => {
    const innovationDataMemo = useMemo(() => Object.keys(innovationData), []);

    return (
        <Flex direction="column" wrap="wrap" gap="3">
            <TwilightSearchPopup
                buttonText="Add Innovation"
                labelText="Search Innovations"
                options={innovationDataMemo}
                onSubmit={(innovationToAdd) => {
                    console.log(innovationToAdd);
                    if (campaignData.innovations.indexOf(innovationToAdd) === -1) {
                        dbExecutePatch({
                            data: { innovations: [...campaignData.innovations, innovationToAdd] },
                        })
                            .then(() => dbRefetch())
                            .catch((err) => console.error(err));
                    }
                }}
            />
            <Flex direction="column" gap="3">
                <TwilightNodeHeader headerText="Innovations" />
                {campaignData.innovations.sort().map((innovation, idx) => {
                    return <InnovationCard key={idx} innovation={innovation as keyof InnovationKeys} />;
                })}
            </Flex>
        </Flex>
    );
};

export default SubTabInnovations;
