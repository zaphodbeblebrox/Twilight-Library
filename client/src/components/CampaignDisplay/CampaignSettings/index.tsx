import { Button } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../../SettlementTypes';
import { settlementApi } from '../../../service/api';
import { useNavigate } from 'react-router-dom';

interface TabCampaignSettingsProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<null, null>;
    dbExecutePatch: RefetchFunction<Partial<TypeServerSettlement>, null>;
}

const TabCampaignSettings = ({ campaignData, dbRefetch, dbExecutePatch }: TabCampaignSettingsProps) => {
    const navigate = useNavigate();
    const [, deletePatch] = useAxios(
        {
            url: `${settlementApi}/delete/${campaignData._id}`,
            method: 'DELETE',
        },
        { manual: true },
    );

    return (
        <Button
            onClick={() => {
                deletePatch().then(() => navigate('/twilight-library/dashboard'));
            }}
        >
            Delete Campaign
        </Button>
    );
};

export default TabCampaignSettings;
