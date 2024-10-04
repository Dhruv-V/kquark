import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { theme } from "@/styles/theme";
import { Controller, type Control } from "react-hook-form";
import grin from "../../assets/media/grin.png";
import angry from "../../assets/media/angry.png";
import expressionLess from "../../assets/media/expressionless.png";
import rage from "../../assets/media/rage.png";
import smile from "../../assets/media/smile.png";

type SliderInputType = {
  label: string;
  name: string;
  control: Control;
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  prefix?: string;
  suffix?: string;
  style?: any;
  showValue?: boolean;
};

const SliderInput = ({
  name,
  label,
  control,
  max,
  min,
  step,
  initialValue = 0,
  prefix,
  suffix,
  style,
  showValue = false,
}: SliderInputType) => {
  const [value, setValue] = useState(initialValue); // Default height value

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {/* {showValue && <Text style={styles.heightText}>{`${value} ${prefix ?? ""}`}</Text>} */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Slider
            style={[styles.slider, style]}
            minimumValue={min ?? 0}
            maximumValue={max ?? 100}
            step={step ?? 1}
            value={value ?? min ?? 0}
            onValueChange={(v) => {
              setValue(v);
              onChange(v);
            }}
            maximumTrackTintColor={theme.colors["text-grey1"]}
            minimumTrackTintColor={theme.colors["bg-green"]}
            thumbTintColor="#1FB28A"
            // thumbImage={grinEmoji}
            StepMarker={(e) =>
              e.stepMarked ? (
                <Text style={styles.sliderText}>
                  {prefix ? ` ${prefix}` : ""}
                  {e.currentValue}
                  {suffix ? ` ${suffix}` : ""}
                </Text>
              ) : null
            }
          />
        )}
      />
    </View>
  );
};

// (e) => {
//   if (e.currentValue == 1 && e.stepMarked)
//     return <Image style={styles.sliderEmoji} source={rage} />;
//   if (e.currentValue == 2 && e.stepMarked)
//     return <Image style={styles.sliderEmoji} source={angry} />;
//   if (e.currentValue == 3 && e.stepMarked)
//     return <Image style={styles.sliderEmoji} source={expressionLess} />;
//   if (e.currentValue == 4 && e.stepMarked)
//     return <Image style={styles.sliderEmoji} source={smile} />;
//   if (e.currentValue == 5 && e.stepMarked)
//     return <Image style={styles.sliderEmoji} source={grin} />;
//   else return null;
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: theme.colors["text-grey1"],
    fontFamily: theme.fonts.secondary,
  },
  heightText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.text,
  },
  slider: {
    width: "80%",
    height: 40,
    borderRadius: 20,
  },
  sliderEmoji: {
    height: 40,
    width: 40,
    position: "absolute",
    top: -30,
    left: -7,
    borderRadius: "50%",
    color: theme.colors["text-grey1"],
    fontSize: 16,
    fontWeight: "600",
  },
  sliderText: {
    height: 40,
    position: "absolute",
    top: -30,
    left: -2,
    color: theme.colors["text-grey1"],
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SliderInput;
