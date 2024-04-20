import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressBarProps {
  stepCount: number;
  currStep: number;
  colorScheme: 'light' | 'dark';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ stepCount = 1, currStep = 0, colorScheme = 'light' }) => {
  const styles = StyleSheet.create({
    progress_container: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: '95%',
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "nowrap",
    },

    progress_bar: {
      height: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'rgba(99, 99, 102, 1)',
      
    }
  });

  return (
    <View style={[styles.progress_container]}>
      {Array(stepCount).fill(0).map((_, idx) => {
        if ((idx + 1) < currStep) {
          return (
            <View key={`bar_${idx}`} style={[styles.progress_bar, { width: `${(100 / stepCount) - 1}%`, marginRight: (idx === (stepCount - 1) ? undefined : '3%'), backgroundColor: (colorScheme === 'dark' ? 'rgba(10, 132, 255, 1)' : 'green') }]} />
          )
        }
        else if ((idx + 1) === currStep) {
          return (
            <LinearGradient
              key={`bar_${idx}`}
              style={[styles.progress_bar, { width: `${(100 / stepCount) - 1}%`, marginRight: (idx === (stepCount - 1) ? undefined : '3%') }]}
              colors={[(colorScheme === 'dark') ? 'rgba(10, 132, 255, 1)' : 'green', (colorScheme === 'dark') ? 'rgba(10, 132, 255, 0.3)' : 'green', (colorScheme === 'dark') ? 'rgba(10, 132, 255, 0)' : 'rgba(0, 122, 255, 0)']}
              start={[0, 0]} end={[1, 0]}
            />
          )
        }
        else {
          return (
            <View key={`bar_${idx}`} style={[styles.progress_bar, { width: `${(100 / stepCount) - 1}%`, marginRight: (idx === (stepCount - 1) ? undefined : '3%') }]} />
          )
        }
      })}
    </View>
  )
}

export default ProgressBar;
