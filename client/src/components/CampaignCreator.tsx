import PillarOptions from './PillarOptions';
import OptionListCC from './OptionListCC';
import CcData from '../static_data/campaign_creator.json';
import RbListCC from './RbListCC';
import { Button, Select } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';
import { TLSelect } from './primitive_components/primitives';
import { useEffect, useState } from 'react';

// import { Label } from '@radix-ui/react-label';

const CampaignCreator = () => {
    const [presetCampaign, setPresetCampaign] = useState(CcData.campaigns[0]);
    const [campaignSettings, setCampaignSettings] = useState({});

    useEffect(() => console.log('campaign', presetCampaign), [presetCampaign]);

    const CreateTimelineHandler = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={CreateTimelineHandler}>
            <h2>Campaign Creator</h2>
            <div>
                <TLSelect
                    header={'Preset Campaign'}
                    options={CcData.campaigns}
                    value={presetCampaign}
                    setValue={setPresetCampaign}
                />
            </div>
            <h3>Campaign Pillars</h3>
            <PillarOptions />
            <div>
                <h3>Node Quarries</h3>
                <div>
                    <OptionListCC header="NQ1" options={CcData.node_quarry_1} />
                    <OptionListCC header="NQ2" options={CcData.node_quarry_2} />
                    <OptionListCC header="NQ3" options={CcData.node_quarry_3} />
                    <OptionListCC
                        header={'NQ4'}
                        options={CcData.node_quarry_4}
                    />
                </div>
            </div>
            <div>
                <h3>Node Nemesis</h3>
                <div>
                    <OptionListCC
                        header="NN1"
                        options={CcData.node_nemesis_1}
                    />
                    <OptionListCC
                        header="NN2"
                        options={CcData.node_nemesis_2}
                    />
                    <OptionListCC
                        header="NN3"
                        options={CcData.node_nemesis_3}
                    />
                </div>
            </div>
            <div>
                <h3>Node Critical</h3>
                <div>
                    <RbListCC header="Core" options={CcData.node_core} />
                    <RbListCC header="Finale" options={CcData.node_finale} />
                    <OptionListCC
                        header="Special"
                        options={CcData.node_special}
                    />
                </div>
            </div>
            <div>
                <Button>Cancel</Button>
                <Button>Timeline</Button>
            </div>
        </form>
    );
};

export default CampaignCreator;
