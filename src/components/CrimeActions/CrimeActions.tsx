import { HStack } from '@chakra-ui/react';
import { CrimeProps } from 'src/types';

import CrimeEdit from 'src/components/CrimeEdit/CrimeEdit';
import CrimeDelete from 'src/components/CrimeDelete/CrimeDelete';

const CrimeActions: React.FC<CrimeProps> = ({ crime }) => {
  return (
    <HStack>
      <CrimeEdit crime={crime} />
      <CrimeDelete crime={crime} />
    </HStack>
  );
};

export default CrimeActions;
