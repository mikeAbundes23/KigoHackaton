import React, { useRef } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

export default function App() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <MapView style={styles.map} />
        <TouchableOpacity style={styles.button} onPress={openBottomSheet}>
          <Text style={styles.buttonText}>Botón</Text>
        </TouchableOpacity>
        <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={['25%', '50%', '75%']}>
          <BottomSheetView style={styles.bottomSheet}>
            <Text style={styles.bottomSheetText}>Contenido del Modal</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    padding: 16,
  },
  bottomSheetText: {
    fontSize: 20,
  },
});
