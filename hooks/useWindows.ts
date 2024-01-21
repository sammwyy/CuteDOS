import { useContext } from 'react';

import { WindowsContext } from '@/contexts/windows';

const useWindows = () => useContext(WindowsContext);

export default useWindows;
