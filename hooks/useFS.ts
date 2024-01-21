import { useContext } from 'react';

import { FSContext } from '@/contexts/fs';

const useFS = () => useContext(FSContext);

export default useFS;
