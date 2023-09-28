import { Button, Flex } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import DisplayAllCampaigns from './DisplayAllCampaigns';

const Dashboard = () => {
    const navigate = useNavigate();
    const handleNavigation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign');
    };
    return (
        <Flex direction="column" justify="between" align="center" gap="3">
            <Button onClick={handleNavigation}>New Campaign</Button>
            <DisplayAllCampaigns />
        </Flex>
    );
};

export default Dashboard;
