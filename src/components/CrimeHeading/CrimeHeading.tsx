import { Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type CrimeHeadingProps = {
  text: string;
};

const CrimeHeading: React.FC<CrimeHeadingProps> = ({ text }) => {
  const router = useRouter();
  return (
    <>
      <Heading
        onClick={() => router.push('/')}
        cursor={'pointer'}
        fontSize={'2xl'}
        color={'white'}
        fontWeight={'black'}
      >
        CrimeReport.
      </Heading>
      <Text my={'0.6rem'} color={'white'} fontSize={'lg'}>
        {text}
      </Text>
    </>
  );
};

export default CrimeHeading;
