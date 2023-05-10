import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

//Constants
import { currencyByRupee } from './constants';
//Components
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar';


function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a value",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const ConvertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${ConvertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    }
    else {
      return Snackbar.show({
        text: "Not a valid number to convert",
        backgroundColor: "#F4BE2c",
        textColor: "#000000"
      });
    }
  };
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titletxt}>CURRENCY CONVERTER</Text>
        <View style={styles.rupeesContainer}>
<Text style={styles.rupee}>₹</Text>
<TextInput
maxLength={14}
value={inputValue}
clearButtonMode='always'//for IOS
onChangeText={setInputValue}
keyboardType='number-pad'
placeholder='Enter Amount in Rupees'
/>
  </View>
  {resultValue && (
    <Text style={styles.resultTxt}>
      {resultValue}
    </Text>
  )}</View>
  <View style={styles.bottomContainer}>
    <FlatList
    numColumns={3}
    data={currencyByRupee}
    keyExtractor={item=>item.name}
    renderItem={({item})=> (
      <Pressable
        style={[styles.button,
                targetCurrency === item.name && styles.selected
      ]}
        onPress={()=>buttonPressed(item)}
      >
        <CurrencyButton {...item}/>
      </Pressable>
    )}
    />
  </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#700211',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titletxt:{
    fontSize:25,
    fontWeight:'bold',
    backgroundColor:"#700211",
    padding:20,
    fontFamily:'Times New Roman',
    color:'#000000'
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    alignItems:'center',
    fontSize: 40,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 20,
    height: 70,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
