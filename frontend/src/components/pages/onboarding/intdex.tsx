import {ScrollView, Text, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export const Onboarding = (): JSX.Element => {
  return (
    <View>
      <ScrollView></ScrollView>
      <Text style={GlobalStyles.pink}>안녕!!</Text>
    </View>
  );
};
