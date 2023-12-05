import { Flex } from '@radix-ui/themes';
import { RefetchFunction } from 'axios-hooks';
import { TypeServerSettlement } from '../../../../SettlementTypes';
import { TwilightEditCountDialog } from '../primitiveComponents/AlertBoxes';
import { TwilightNodeHeader } from '../primitiveComponents/Primitives';
import { TwilightSearchPopup } from '../primitiveComponents/SearchBoxes';
import { GearKeys, gearData } from '../static_data_file_configs/gearConfig';
import { useMemo } from 'react';

interface SubTabGearProps {
    campaignData: TypeServerSettlement;
    dbRefetch: RefetchFunction<any, any>;
    dbExecutePatch: RefetchFunction<any, any>;
}

const SubTabGear = ({ campaignData, dbRefetch, dbExecutePatch }: SubTabGearProps) => {
    const gearDataMemo = useMemo(() => Object.keys(gearData), []);

    return (
        <Flex direction="row" wrap="wrap" gap="3">
            <TwilightSearchPopup
                buttonText="Add Gear"
                labelText="Search Gear"
                options={gearDataMemo}
                onSubmit={(gearToAdd) => {
                    console.log(gearToAdd);
                    const newGearLocation = gearData[gearToAdd as keyof GearKeys].location;
                    const updatedGear = { ...campaignData.gear };
                    if (!campaignData.gear[newGearLocation]) {
                        updatedGear[newGearLocation] = { [gearToAdd]: 0 };
                    } else if (!campaignData.gear[newGearLocation][gearToAdd]) {
                        updatedGear[newGearLocation] = { ...updatedGear[newGearLocation], [gearToAdd]: 0 };
                    } else {
                        // TODO: Return popup message "Already in inventory under ____ Location."
                        return;
                    }
                    dbExecutePatch({
                        data: { gear: updatedGear },
                    })
                        .then(() => dbRefetch())
                        .catch((err) => console.error(err));
                }}
            />
            {Object.keys(campaignData.gear)
                .sort()
                .map((gearCategory, idx) => {
                    return (
                        <Flex key={idx} direction="column" gap="1" justify="start" align="end">
                            <TwilightNodeHeader headerText={gearCategory} />
                            {Object.keys(campaignData.gear[gearCategory])
                                .sort()
                                .map((gear, idy) => {
                                    const handleCountChange = (updatedCount: number) => {
                                        const updatedResources = { ...campaignData.gear };
                                        updatedResources[gearCategory][gear] = updatedCount;
                                        console.log(updatedResources);
                                        dbExecutePatch({
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

export default SubTabGear;
