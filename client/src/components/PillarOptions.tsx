import { Checkbox } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';
import ccData from '../static_data/campaign_creator.json';
import { TLCheckbox } from './primitive_components/primitives';

interface PillarOptionsProps {
    data: {};
    setData: React.Dispatch<React.SetStateAction<{}>>;
}

const PillarOptions = ({data, setData}: PillarOptionsProps) => {
    return (
        <div>
            <TLCheckbox label="Arc Survivors" value={data} setValue={setData}/>
            <TLCheckbox label="Characters" value={data} setValue={setData}/>

            <div>
                <p className="subheader">Encounters</p>
                {ccData.encounters.map((option, idx) => {
                    return (
                        <TLCheckbox key={idx} label={option} value={data} setValue={setData}/>
                    );
                })}
            </div>

            <TLCheckbox label="Scouts" value={data} setValue={setData}/>
            <TLCheckbox label="Seed Patterns" value={data} setValue={setData}/>

            <div>
                <p className="subheader">Wanderers</p>
                {ccData.wanderers.map((option, idx) => {
                    return (
                        <TLCheckbox key={idx} label={option} value={data} setValue={setData}/>
                    );
                })}
            </div>
        </div>
    );
};

export default PillarOptions;
