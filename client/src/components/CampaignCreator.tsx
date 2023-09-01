import PillarOptions from './PillarOptions';
import OptionListCC from './OptionListCC';
import ccData from '../static_data/campaign_creator.json';
import RbListCC from './RbListCC';
import { Button, Select } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';
import { TLSelect } from './primitive_components/primitives';
import { useEffect, useState } from 'react';

// import { Label } from '@radix-ui/react-label';

const CampaignCreator = () => {
    const [presetCampaign, setPresetCampaign] = useState(ccData.campaigns[0]);
    const [campaignSettings, setCampaignSettings] = useState({});

    useEffect(() => console.log('checkbox status', campaignSettings), [campaignSettings]);
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
                    options={ccData.campaigns}
                    value={presetCampaign}
                    setValue={setPresetCampaign}
                />
            </div>
            <h3>Campaign Pillars</h3>
            <PillarOptions data={campaignSettings} setData={setCampaignSettings}/>
            <div>
                <h3>Node Quarries</h3>
                <div>
                    <OptionListCC header="NQ1" options={ccData.node_quarry_1} data={campaignSettings} setData={setCampaignSettings}/>
                    <OptionListCC header="NQ2" options={ccData.node_quarry_2} data={campaignSettings} setData={setCampaignSettings}/>
                    <OptionListCC header="NQ3" options={ccData.node_quarry_3} data={campaignSettings} setData={setCampaignSettings}/>
                    <OptionListCC
                        header={'NQ4'} 
                        options={ccData.node_quarry_4} data={campaignSettings} setData={setCampaignSettings}
                    />
                </div>
            </div>
            <div>
                <h3>Node Nemesis</h3>
                <div>
                    <OptionListCC
                        header="NN1"
                        options={ccData.node_nemesis_1}
                        data={campaignSettings} setData={setCampaignSettings}
                    />
                    <OptionListCC
                        header="NN2"
                        options={ccData.node_nemesis_2}
                        data={campaignSettings} setData={setCampaignSettings}
                    />
                    <OptionListCC
                        header="NN3"
                        options={ccData.node_nemesis_3}
                        data={campaignSettings} setData={setCampaignSettings}
                    />
                </div>
            </div>
            <div>
                <h3>Node Critical</h3>
                <div>
                    <RbListCC header="Core" options={ccData.node_core} />
                    <RbListCC header="Finale" options={ccData.node_finale} />
                    <OptionListCC
                        header="Special"
                        options={ccData.node_special}
                        data={campaignSettings} setData={setCampaignSettings}
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
