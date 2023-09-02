import PillarOptions from './PillarOptions';
import OptionListCC from './OptionListCC';
import ccData from '../static_data/campaign_creator.json';
import RbListCC from './RbListCC';
import { Button, Heading, Select } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';
import { TLSelect } from './primitive_components/primitives';
import { useEffect, useState } from 'react';

// import { Label } from '@radix-ui/react-label';

const CampaignCreator = () => {
    const [presetCampaign, setPresetCampaign] = useState(ccData.campaigns[0]);
    const [campaignSettings, setCampaignSettings] = useState({});

    useEffect(() => console.log('checkbox status', campaignSettings), [campaignSettings]);
    useEffect(() => console.log('campaign', presetCampaign), [presetCampaign]);

    const LoadPresetCampaignSelectionHandler = (campaign:string) => {
        if(ccData.hasOwnProperty(campaign)){
            const modCampaignSettings:Record<string, boolean> = {...campaignSettings};
            for(const key in modCampaignSettings){
                modCampaignSettings[key] = false;
            }
            const settings = ccData[campaign as keyof typeof ccData];
            if(Array.isArray(settings)){
                settings.map((key:string) => modCampaignSettings[key] = true);
            }
            setCampaignSettings(modCampaignSettings);
        }
    }

    const CreateTimelineHandler = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={CreateTimelineHandler}>
            <Heading size="7">Campaign Creator</Heading>
            <div>
                <TLSelect
                    header={'Preset Campaign'}
                    options={ccData.campaigns}
                    onChange={LoadPresetCampaignSelectionHandler}
                    value={presetCampaign}
                    // setValue={setPresetCampaign}
                />
            </div>
            <Heading size="5">Campaign Pillars</Heading>
            <PillarOptions data={campaignSettings} setData={setCampaignSettings}/>
            <div>
            <Heading size="5">Node Quarries</Heading>
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
                <Heading size="5">Node Nemesis</Heading>
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
                <Heading size="5">Node Critical</Heading>
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
