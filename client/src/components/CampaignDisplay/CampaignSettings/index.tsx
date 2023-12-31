import { Button } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { settlementApi } from '../../../service/api';

interface TabCampaignSettingsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabCampaignSettings = ({ campaignData, dbRefetch, dbExecutePatch }: TabCampaignSettingsProps) => {
    const [, deletePatch] = useAxios(
        {
            url: `${settlementApi}/delete/${campaignData._id}`,
            method: 'DELETE',
        },
        { manual: true },
    );

    return <Button onClick={() => deletePatch()}>Delete Campaign</Button>;
};

export default TabCampaignSettings;
