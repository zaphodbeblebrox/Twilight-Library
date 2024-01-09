import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Flex, Heading, Separator } from '@radix-ui/themes';
import CalcCollectiveCognition from './CalcCollectiveCognition';
import AddKnowledgeDialog from './AddKnowledgeDialog';

interface TabKnowledgeProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabKnowledge = ({ campaignData, dbRefetch, dbExecutePatch }: TabKnowledgeProps) => {
    return (
        <Flex direction="column">
            <Heading>Collective Cognition: {String(CalcCollectiveCognition(campaignData))}</Heading>
            <Separator my="3" size="4" />
            <Flex direction={'row'} gap={'2'} justify={'center'}>
                <Heading>Known Knowledge</Heading>
                <AddKnowledgeDialog
                    buttonText="+"
                    onSubmit={(newKnowledge) => {
                        dbExecutePatch({
                            data: { knowledges: [...campaignData.knowledges, newKnowledge] },
                        })
                            .then(() => dbRefetch())
                            .catch((err) => console.error(err));
                    }}
                />
            </Flex>
        </Flex>
    );
};

export default TabKnowledge;
