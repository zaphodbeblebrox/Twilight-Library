import { Checkbox } from '@radix-ui/themes';
import * as Label from '@radix-ui/react-label';
import ccData from '../static_data/campaign_creator.json';

const PillarOptions = () => {
    return (
        <div>
            <div>
                <Checkbox value={'Arc Survivors'} id="arc-survivors" />
                <Label.Root htmlFor="arc-survivors">
                    Arc Survivors - 3 Pillars
                </Label.Root>
            </div>

            <div>
                <Checkbox value={'Characters'} id="characters" />
                <Label.Root htmlFor="characters">
                    Characters - 1 Pillar
                </Label.Root>
            </div>

            <div>
                <p className="subheader">Encounters - 2 Pillars</p>
                {ccData.Encounters.map((option, idx) => {
                    return (
                        <div key={idx}>
                            <Checkbox value={option} id="idx" />
                            <Label.Root htmlFor="idx">{option}</Label.Root>
                        </div>
                    );
                })}
            </div>

            <div>
                <Checkbox value={'Scouts'} id="scouts" />
                <Label.Root htmlFor="scouts">Scouts - 1 Pillar</Label.Root>
            </div>

            <div>
                <Checkbox value={'Seed Patterns'} id="seed-patterns" />
                <Label.Root htmlFor="seed-patterns">
                    Seed Patterns - 1 Pillar
                </Label.Root>
            </div>

            <div>
                <p className="subheader">Wanderers - 1 Pillar</p>
                {ccData.Wanderers.map((option, idx) => {
                    return (
                        <div key={idx}>
                            <Checkbox value={option} id="idx" />
                            <Label.Root htmlFor="idx">{option}</Label.Root>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PillarOptions;
