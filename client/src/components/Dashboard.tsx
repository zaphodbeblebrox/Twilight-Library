import { Button, Flex } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const handleNavigation = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/twilight-library/dashboard/create-campaign');
    };
    return (
        <Flex>
            <Button onClick={handleNavigation}>New Campaign</Button>
        </Flex>
    );
};

export default Dashboard;
