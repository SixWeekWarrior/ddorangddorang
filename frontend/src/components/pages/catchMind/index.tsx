import {StyleSheet} from 'react-native';
// import GlobalStyles from '../../../styles/GlobalStyles';
// import MenuTop from '../../molecules/menuTop';
import React, {useRef} from 'react';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';

interface Props {
  text: string;
  onOK: (signature: any) => void;
}

const CatchMind = ({text, onOK}: Props) => {
  const ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature: any) => {
    console.log(signature);
    onOK(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleEnd = () => {
    ref.current?.readSignature();
  };

  return (
    <SignatureScreen
      ref={ref}
      onEnd={handleEnd}
      onOK={handleSignature}
      onEmpty={handleEmpty}
      onClear={handleClear}
      autoClear={true}
      descriptionText={text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CatchMind;
