import { Flex } from '@radix-ui/themes';
import useAxios, { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { settlementApi } from '../../service/api';
import { TwilightEditCountDialog } from '../primitiveComponents/AlertBoxes';
import { TwilightNodeHeader } from '../primitiveComponents/Primitives';
import { TwilightSearchPopup } from '../primitiveComponents/SearchBoxes';
import { gearData } from '../static_data_file_configs/gearConfig';

interface GearTabProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
}

const GearTab = ({ campaignData, dbRefetch }: GearTabProps) => {
    const [{ data: patchData, loading: patchLoading, error: patchError }, executePatch] = useAxios(
        {
            url: `${settlementApi}/update/${campaignData._id}`,
            method: 'PATCH',
        },
        { manual: true },
    );

    const handleAddGear = () => {};

    return (
        <Flex direction="row" wrap="wrap" gap="3">
            {Object.keys(campaignData.gear)
                .sort()
                .map((gearCategory, idx) => {
                    return (
                        <Flex key={idx} direction="column" gap="1" justify="start" align="end">
                            <TwilightSearchPopup
                                buttonText="Add Gear"
                                labelText="Search Gear"
                                options={Object.keys(gearData)}
                                onSubmit={handleAddGear}
                            />
                            <TwilightNodeHeader headerText={gearCategory} />
                            {Object.keys(campaignData.gear[gearCategory])
                                .sort()
                                .map((gear, idy) => {
                                    const handleCountChange = (updatedCount: number) => {
                                        const updatedResources = { ...campaignData.gear };
                                        updatedResources[gearCategory][gear] = updatedCount;
                                        console.log(updatedResources);
                                        executePatch({
                                            data: { gear: updatedResources },
                                        })
                                            .then(() => dbRefetch())
                                            .catch((err) => console.error(err));
                                    };
                                    return (
                                        <TwilightEditCountDialog
                                            key={idy}
                                            labelText={gear}
                                            count={campaignData.gear[gearCategory][gear]}
                                            onSubmit={(updatedCount) => handleCountChange(updatedCount)}
                                        />
                                    );
                                })}
                        </Flex>
                    );
                })}
        </Flex>
    );
};

export default GearTab;
