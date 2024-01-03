import MainContent from '@/components/MainContent';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Tab } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { encode, decode } from 'html-entities';
import TextFieldWithCopy from '@/components/TextFieldWithCopy';
import TextFieldWithClean from '@/components/TextFieldWithClean';

const Hex: React.FC = () => {
  const [method, setMethod] = React.useState('encode');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const funcMap = useMemo(() => {
    const m = new Map<String, Function>();
    m.set('encode', encode);
    m.set('decode', decode);
    return m;
  }, []);

  const handleChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
    var fn = funcMap.get(method);
    if (fn) {
      setOutput(fn(input));
    }
  };

  const handleInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      var value = event.target.value;
      setInput(value);
      var fn = funcMap.get(method);
      if (fn) {
        setOutput(fn(value));
      }
    },
    [funcMap, method]
  );

  const handleCleanClick = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return (
    <MainContent>
      <>
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab
                label='编码'
                value='encode'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='解码'
                value='decode'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
        </TabContext>
        <TextFieldWithClean
          variant='outlined'
          label='输入'
          value={input}
          onChange={handleInputChanged}
          onClean={handleCleanClick}
          minRows='5'
          maxRows='10'
          size='small'
          multiline
          sx={{
            width: '100%',
            textarea: { fontFamily: 'Mono' },
          }}
        />
        <TextFieldWithCopy
          variant='outlined'
          label='输出'
          value={output}
          minRows='5'
          maxRows='10'
          size='small'
          multiline
          InputProps={{
            readOnly: true,
          }}
          sx={{
            width: '100%',
            textarea: { fontFamily: 'Mono' },
          }}
        />
      </>
    </MainContent>
  );
};

export default Hex;
