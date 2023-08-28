import { Flex } from "@radix-ui/themes";
import OptionListCC from "./OptionListCC";
import JSONStuff from "../static_data/campaign_creator.json";
import AppHeader from "./AppHeader";

function CampaignCreator() {
  return (
    <Flex direction="column" align="center" gap="4">
      <AppHeader />
      <OptionListCC header="Test" options={JSONStuff.node_quarry_1} />
      {/* <Header as="h2">Core</Header>
      <Header as="h2">Finale</Header>
      <Header as="h2">Campaign Pillars</Header> */}
    </Flex>
  );
}

export default CampaignCreator;
