import React from 'react';
import {StyleSheet, View} from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';

export const ColorTest = (): JSX.Element => {
  return (
    <View style={style.container}>
      <View style={style.containerTop}>
        <View style={style.topLeft}>
          <View style={style.topTop}></View>
          <View style={style.topBottom}></View>
        </View>

        <View style={style.topRight} />
      </View>

      <View style={style.containerMid}></View>

      <View style={style.containerBottom}>
        <View style={style.bottomLeft}>
          <View style={style.bottomTop}></View>
          <View style={style.bottomBottom}></View>
        </View>
        <View style={style.buttomRight} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flexDirection: 'row',
    flex: 1,
  },

  containerBottom: {
    backgroundColor: GlobalStyles.white_2.color,
    flexDirection: 'row',
    flex: 1,
  },

  containerMid: {
    backgroundColor: GlobalStyles.white_2.color,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
    flex: 0.5,
    marginLeft: 24,
    marginRight: 24,
  },

  topLeft: {
    flex: 1,
  },

  topRight: {
    backgroundColor: GlobalStyles.blue.color,
    flex: 1,
    borderRadius: 20,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 24,
    marginBottom: 50,
  },

  buttomRight: {
    backgroundColor: GlobalStyles.green.color,
    flex: 1,
    borderRadius: 20,
    marginTop: 24,
    marginLeft: 20,
    marginRight: 24,
    marginBottom: 24,
  },

  bottomLeft: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 1,
  },

  topTop: {
    backgroundColor: GlobalStyles.pink.color,
    flexDirection: 'row',
    borderRadius: 20,
    flex: 3,
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
  },

  topBottom: {
    backgroundColor: GlobalStyles.yellow.color,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    margin: 24,
  },

  bottomTop: {
    backgroundColor: GlobalStyles.white_2.color,
    flex: 3,
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: GlobalStyles.grey_3.color,
  },

  bottomBottom: {
    backgroundColor: GlobalStyles.grey_1.color,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 60,
  },
});

export default ColorTest;
