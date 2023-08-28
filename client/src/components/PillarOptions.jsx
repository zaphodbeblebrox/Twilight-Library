import { Checkbox } from "@radix-ui/themes";

const PillarOptions = () => {
  return (
    <div>
      <Checkbox value={"Arc Survivors"}>Arc Survivors - 3 Pillars</Checkbox>
      <Checkbox value={"Characters"}>Characters - 1 Pillar</Checkbox>
      <div>
        <p>Encounters - 2 Pillars</p>
        <Checkbox value={"Bone Eaters"}>Bone Eaters</Checkbox>
      </div>
      <Checkbox value={"Scouts"}>Scouts - 1 Pillar</Checkbox>
      <Checkbox value={"Seed Patterns"}>Seed Patterns - 1 Pillar</Checkbox>
      <div>
        <p>Wanderers - 1 Pillar</p>
        <Checkbox value={"Luck the Wanderer"}>Luck the Wanderer</Checkbox>
      </div>
    </div>
  );
};

export default PillarOptions;
