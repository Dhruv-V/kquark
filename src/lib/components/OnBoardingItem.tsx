import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import type { Question, QuestionGroup } from "@/dummy/onboarding-config";
import { theme } from "@/styles/theme";
import TouchableButton from "./TouchableButton";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import DateTimePickerField from "./DateTimePicker";
import SliderInput from "./SliderInput";
import MultipleSelectChips from "./MultiSelectChips";
import MCQInput from "./MCQ";
import { NumericInput } from "./NumericInput";

const OnBoardingItem = ({
  control,
  getValues,
  currentIndex,
  question,
  setCurrentIndex,
  noOfItems,
}: {
  control: any;
  getValues: any;
  currentIndex: number;
  question: QuestionGroup | undefined;
  setCurrentIndex: (e: any) => void;
  noOfItems: number;
}) => {
  if (!question) return;
  const { height, width } = useWindowDimensions();

  const getItem = (question: Question) => {
    switch (question.type) {
      case "text-input":
        return (
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={[styles.itemContainer]} bounces={false}>
              <InputField
                title=" "
                key={question.name}
                name={question.name}
                control={control}
                placeholder={question.placeholder}
                wrapperStyle={{
                  marginVertical: 2,
                }}
                style={{
                  // width: width * 0.8,
                  paddingVertical: 12,
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  fontSize: 20,
                  fontFamily: theme.fonts.secondary,
                  color: "white",
                }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        );
      case "date":
        return (
          <ItemView>
            <DateTimePickerField
              key={question.name}
              control={control}
              name={question.name}
              title=" "
              style={{ width: width * 0.7, height: height * 0.24, padding: 16 }}
            />
          </ItemView>
        );
      case "time":
        return (
          <ItemView style={{ paddingLeft: 10 }}>
            <DateTimePickerField
              key={question.name}
              control={control}
              name={question.name}
              title=" "
              style={{ width: width * 0.6, borderRadius: 10, padding: 10, height: height * 0.22 }}
              format="time"
            />
          </ItemView>
        );
      case "slider":
        return (
          <SliderInput
            key={question.name}
            name={question.name}
            label={" "}
            control={control}
            max={question.max ?? 100}
            min={question.min ?? 0}
            step={question.step ?? 1}
            style={{}}
            prefix={question.prefix}
            suffix={question.suffix}
          />
        );
      case "chips":
        return (
          <MultipleSelectChips
            key={question.name}
            control={control}
            name={question.name}
            data={question.options ?? []}
            value={getValues()?.[question.name]}
          />
        );
      case "select":
        return (
          <MCQInput
            key={question.name}
            control={control}
            label=" "
            name={question.name}
            choices={question.options ?? []}
          />
        );
      case "prefixed-input":
        return (
          <ItemView>
            <NumericInput
              key={question.name}
              control={control}
              label={" "}
              name={question.name}
              prefix={question.prefix}
            />
          </ItemView>
        );
      case "suffixed-input":
        return (
          <ItemView>
            <NumericInput
              key={question.name}
              control={control}
              label={" "}
              name={question.name}
              suffix={question.suffix}
            />
          </ItemView>
        );
      default:
        return (
          <ItemView>
            <Text style={{ color: "white" }}>Hello</Text>
          </ItemView>
        );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: width,
        // alignItems: "center",
      }}
    >
      <FlatList
        data={question?.questions}
        renderItem={({ item }: { item: Question }) => (
          <Pressable
            style={[styles.container, { width: width - 30 }]}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={{ padding: 10 }}>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            {getItem(item)}
          </Pressable>
        )}
        contentContainerStyle={{
          width: width - 20,
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

const ItemView = ({ children, style }: any) => (
  <View style={[styles.itemContainer, style]}>{children}</View>
);

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    // borderBottomColor: "rgba(200,200,200,.3)",
    // borderTopColor: "rgba(200,200,200,.3)",
    // borderWidth: 1,
  },
  itemContainer: {
    width: "100%",
    paddingLeft: 10,
  },
  label: {
    fontSize: 28,
    fontWeight: "300",
    color: theme.colors.text,
    fontFamily: theme.fonts.secondary,
  },
  aspect: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
    fontFamily: theme.fonts.primaryMedium,
    color: theme.colors["text-grey1"],
    paddingBottom: 10,
    borderColor: "rgba(200,200,200,.3)",
    marginHorizontal: 20,
    backgroundColor: "black",
  },
});
