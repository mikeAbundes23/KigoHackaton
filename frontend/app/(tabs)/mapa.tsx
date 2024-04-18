import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

export default function App() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <MapView style={styles.map} />
          <TouchableOpacity style={styles.button} onPress={openBottomSheet}>
            <Text style={styles.buttonText}>Botón</Text>
          </TouchableOpacity>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={['15%', '50%', '75%']}
            backgroundComponent={({ style }) => (
              <View style={[style, styles.modalBackground, styles.roundedContainer]} />
            )}
          >
            <View>
              <BottomSheetView style={styles.bottomSheet}>
                <Text style={[styles.bottomSheetText, styles.bigText]}>INDIOS VERDES</Text>
                <View style={styles.line}></View>
              </BottomSheetView>
  </View>
</BottomSheetModal>

        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    top: 20,
    left: 20,
  },
  buttonText: {
    color: 'white',
  },
  bottomSheet: {
    backgroundColor: 'black',
    padding: 16,
  },
  bottomSheetText: {
    fontSize: 20,
    color: 'white', 
  },
  bigText: {
    fontSize: 30,
    textAlign: 'left', 
    fontWeight : 'bold',
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 100)', 
  },
  roundedContainer: {
    flex: 1,
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
  },
  line: {
    height: 5,
    backgroundColor: '#0570b6', 
    marginTop: 10, 
    marginBottom: 10, 
  },
});
