import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ChangeTheme = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon boxSize="25px"  color="white"/>}
            onClick={toggleColorMode}
            colorScheme={
                colorMode === 'light' ? 'blue' : 'orange'
            }
        />
    );
}

export default ChangeTheme;