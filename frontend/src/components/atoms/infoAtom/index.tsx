import {Text, View} from 'react-native';

type infoAtomProps = {
  title: string;
  content: string;
};
export const infoAtom = ({title, content}: infoAtomProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{title}</Text>
      <Text style={{color: #FFD31A}}>|</Text>
      <Text>{content}</Text>
    </View>
  );
};

export default infoAtom;
