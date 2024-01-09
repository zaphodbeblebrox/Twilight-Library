import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { Flex, Heading, Separator } from '@radix-ui/themes';
import CalcCollectiveCognition from './CalcCollectiveCognition';
import AddKnowledgeDialog from './AddKnowledgeDialog';
import KnowledgeInfoCard from './KnowledgeInfoCard';
import { KnowledgeKeys, knowledgeData } from '../../static_data_file_configs/KnowledgeConfig';

interface TabKnowledgeProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabKnowledge = ({ campaignData, dbRefetch, dbExecutePatch }: TabKnowledgeProps) => {
    return (
        <Flex direction="column" gap={'3'}>
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
            <Flex direction={'column'} gap={'2'}>
                {campaignData.knowledges.sort().map((knowledge, idx) => {
                    console.log('knowledge', knowledge, knowledgeData[knowledge as keyof KnowledgeKeys]);
                    return (
                        <KnowledgeInfoCard
                            key={idx}
                            knowledge={knowledge}
                            knowledgeObj={knowledgeData[knowledge as keyof KnowledgeKeys]}
                            onChange={(upgradedKnowledge) => {
                                dbExecutePatch({
                                    data: {
                                        knowledges: [
                                            ...campaignData.knowledges.filter((item) => item !== knowledge),
                                            upgradedKnowledge,
                                        ],
                                    },
                                })
                                    .then(() => dbRefetch())
                                    .catch((err) => console.error(err));
                            }}
                            onDelete={() => {
                                dbExecutePatch({
                                    data: {
                                        knowledges: [...campaignData.knowledges.filter((item) => item !== knowledge)],
                                    },
                                })
                                    .then(() => dbRefetch())
                                    .catch((err) => console.error(err));
                            }}
                        />
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default TabKnowledge;
