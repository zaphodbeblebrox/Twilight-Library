import { Heading, Separator } from '@radix-ui/themes';

function AppHeader() {
    return (
        <>
            <Heading as="h1">Twilight Library</Heading>
            <Separator orientation="horizontal" size="4" />
        </>
    );
}

export default AppHeader;
