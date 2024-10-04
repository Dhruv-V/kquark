import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Paginator from "@/lib/components/Paginator";
import OnBoardingItem from "@/lib/components/OnBoardingItem";
import TouchableButton from "@/lib/components/TouchableButton";
import { theme } from "@/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useIsAuthenticated } from "@/features/user/hooks/useIsAuthenticated";
import { useOnboarding } from "@/features/user/hooks/useOnBoarding";
import onBoarding from "@/features/user/services/on-boarding";
import { useError } from "@/features/user/hooks/useError";
import Loader from "@/lib/components/Loader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { storage } from "@/features/user/store/storage";

const OnBoardingSchema = z.object({
  interests: z.array(z.string()),
  country: z.string(),
  dob: z.string(),
  contactTime: z.string(),
  name: z.string(),
  height: z.number().positive(),
  salary: z.number().nonnegative(),
  satisfaction: z.number().min(1).max(5), // satisfaction should be a percentage (0-100)
});

type OnBoardingSchemaType = z.infer<typeof OnBoardingSchema>;

//onBoarding component
// useEffect api call to get the onboarding questions set them to the store
//create the schema for that
//

const OnBoarding = () => {
  const { setOnBoardingValues, getOnboardingQuestions } = useOnboarding();
  const { width } = useWindowDimensions();
  const { setError } = useError();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setIsAuthenticated } = useIsAuthenticated();
  const [onboardingQuestions, setOnBoardingQuestions] = useState<any>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { control, getValues, setValue } = useForm<OnBoardingSchemaType>({
    defaultValues: {
      interests: [],
      country: "",
      dob: "",
      contactTime: "",
      name: "",
      height: 150,
      salary: 0,
      satisfaction: 1,
    },
    resolver: zodResolver(OnBoardingSchema),
  });

  const nextClick = () => setCurrentIndex((prev: any) => prev + 1);
  const completeClick = () => {
    console.log(getValues());
    // storage.set("OnBoardingForm", JSON.stringify(getValues()));
    setOnBoardingValues(getValues());
    setIsAuthenticated(true);
    return;
  };
  const getQuestions = async () => {
    try {
      const questions = await getOnboardingQuestions.execute();
      if (questions?.length) setOnBoardingQuestions(questions);
    } catch (err) {
      console.log(err);
    }
  };
  const onSkip = () => {
    onboardingQuestions?.length && setValue(onboardingQuestions[currentIndex].name, "");
    setCurrentIndex((prev) => prev + 1);
  };
  useEffect(() => {
    const { error } = onboardingQuestions;
    if (error) {
      setError({ message: error, show: true });
    }
  }, [onboardingQuestions.loading]);
  useEffect(() => {
    getQuestions();
  }, []);
  if (onboardingQuestions.loading) {
    return <Loader />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ marginTop: 50 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginHorizontal: 20,
            alignItems: "center",
          }}
        >
          {currentIndex === 0 ? (
            <View style={{ marginLeft: 24 }}></View>
          ) : (
            <Pressable onPress={() => setCurrentIndex((prev: any) => prev - 1)}>
              <Ionicons name="chevron-back" size={24} color={theme.colors["text-grey3"]} />
            </Pressable>
          )}
          <Text
            style={{
              color: theme.colors["text-grey3"],
              fontFamily: theme.fonts.secondary,
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            {`${onboardingQuestions?.length ? Math.round(((currentIndex + 1) * 100) / onboardingQuestions.length) : 0}%`}
          </Text>
          {currentIndex !== onboardingQuestions.length - 1 ? (
            <Pressable onPress={() => onSkip()}>
              <Text
                style={{
                  color: theme.colors["text-grey1"],
                  fontFamily: theme.fonts.secondary,
                  fontSize: 16,
                }}
              >
                Skip
              </Text>
            </Pressable>
          ) : (
            <View></View>
          )}
        </View>
        <Paginator
          data={onboardingQuestions}
          currentItem={currentIndex}
          dotStyle={{ width: width / (onboardingQuestions?.length ?? 1), borderRadius: 0 }}
        />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={styles.aspect}>{onboardingQuestions[currentIndex]?.lifeAspect ?? ""}</Text>
        <View style={[styles.animatedView]}>
          <OnBoardingItem
            control={control}
            getValues={getValues}
            currentIndex={currentIndex}
            question={onboardingQuestions[currentIndex]}
            setCurrentIndex={setCurrentIndex}
            noOfItems={onboardingQuestions.length}
          />
        </View>
      </View>
      <View style={[styles.btnContainer]}>
        <TouchableButton
          onPress={currentIndex === onboardingQuestions.length - 1 ? completeClick : nextClick}
          style={[
            styles.buttons,
            currentIndex === onboardingQuestions.length - 1 ? styles.complete : "",
          ]}
          textStyle={styles.btnText}
          title={currentIndex === onboardingQuestions.length - 1 ? "Complete" : "Next"}
          icon={() => (
            <Ionicons name="chevron-forward" size={24} color={theme.colors["text-grey3"]} />
          )}
          iconPosition="right"
        />
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: "rgba(44,44,44,.3)",
    borderColor: "rgba(200,200,200,.4)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 30,
    alignItems: "center",
    paddingTop: 20,
  },
  buttons: {
    backgroundColor: theme.colors["bg-blue"],
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  btnText: { color: theme.colors["text-grey3"] },
  complete: {
    backgroundColor: theme.colors["bg-green"],
  },
  aspect: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "400",
    fontFamily: theme.fonts.primaryMedium,
    color: theme.colors["text-grey1"],
    paddingTop: 30,
    paddingBottom: 10,
  },
});
