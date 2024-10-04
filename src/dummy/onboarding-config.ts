// Define a type for a question group where questions are always in an array
export interface QuestionGroup {
  lifeAspect: string; // Aspect of life for the group
  questions: Question[]; // Array of questions
}

// Define the types of questions you want to support
export type QuestionType =
  | "chips" // multiselect
  | "select" // single select (binary included)
  | "date" // time (secondary types)
  | "time"
  | "text-input" // simple text input
  | "prefixed-input" // unit input (numeric)
  | "suffixed-input" // numeric
  | "slider"; // numeric slider

// Define a type for a single question
export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  name: string;
  options?: string[]; // For select or chips
  placeholder?: string; // For simple input
  prefix?: string; // For prefixed input (e.g., "$")
  suffix?: string; // For suffixed input (e.g., "kg")
  min?: number; // For slider
  max?: number; // For slider
  step?: number; // For slider
}

// Sample configuration for onboarding questions with groups
const onboardingQuestions: QuestionGroup[] = [
  {
    lifeAspect: "Personal Info",
    questions: [
      {
        id: "1",
        name: "name",
        type: "text-input",
        label: "Enter your full name",
        placeholder: "John Doe",
      },
      {
        id: "2",
        name: "dob",
        type: "date",
        label: "Select your birthdate",
      },
      {
        id: "3",
        name: "gender",
        type: "select",
        label: "Select your gender",
        options: ["Male", "Female", "Other"],
      },
    ],
  },
  {
    lifeAspect: "Health Metrics",
    questions: [
      {
        id: "4",
        name: "height",
        type: "suffixed-input",
        label: "Enter your height",
        suffix: "cm",
      },
      {
        id: "5",
        name: "weight",
        type: "suffixed-input",
        label: "Enter your weight",
        suffix: "kg",
      },
      {
        id: "6",
        name: "bmi",
        type: "text-input",
        label: "Enter your BMI (if known)",
        placeholder: "e.g., 22.5",
      },
      {
        id: "7",
        name: "bloodPressure",
        type: "text-input",
        label: "Enter your blood pressure",
        placeholder: "e.g., 120/80",
      },
      {
        id: "8",
        name: "heartRate",
        type: "suffixed-input",
        label: "Enter your resting heart rate",
        suffix: "bpm",
      },
    ],
  },
  {
    lifeAspect: "Exercise Habits",
    questions: [
      {
        id: "9",
        name: "exerciseFrequency",
        type: "select",
        label: "How often do you exercise?",
        options: ["Daily", "Few times a week", "Rarely", "Never"],
      },
      {
        id: "10",
        name: "exerciseType",
        type: "chips",
        label: "What types of exercise do you prefer?",
        options: ["Running", "Cycling", "Yoga", "Weight Lifting", "Swimming", "Other"],
      },
      {
        id: "11",
        name: "exerciseDuration",
        type: "slider",
        label: "How many minutes do you exercise per session?",
        min: 10,
        max: 120,
        step: 5,
        suffix: "minutes",
      },
    ],
  },
  {
    lifeAspect: "Diet",
    questions: [
      {
        id: "12",
        name: "dietType",
        type: "select",
        label: "What is your primary diet?",
        options: ["Vegetarian", "Vegan", "Non-Vegetarian", "Pescatarian", "Other"],
      },
      {
        id: "13",
        name: "waterIntake",
        type: "suffixed-input",
        label: "Average daily water intake",
        suffix: "liters",
      },
      {
        id: "14",
        name: "mealFrequency",
        type: "slider",
        label: "How many meals do you eat daily?",
        min: 1,
        max: 6,
        step: 1,
        suffix: "meal/s",
      },
    ],
  },
  {
    lifeAspect: "Sleep",
    questions: [
      {
        id: "15",
        name: "sleepHours",
        type: "slider",
        label: "How many hours do you sleep on average?",
        min: 3,
        max: 12,
        step: 1,
        suffix: "Hour/s",
      },
      {
        id: "16",
        name: "sleepQuality",
        type: "slider",
        label: "Rate the quality of your sleep",
        min: 1,
        max: 10,
        step: 1,
      },
    ],
  },
  {
    lifeAspect: "Wellbeing",
    questions: [
      {
        id: "17",
        name: "stressLevel",
        type: "slider",
        label: "Rate your stress level",
        min: 1,
        max: 10,
        step: 1,
      },
      {
        id: "18",
        name: "satisfaction",
        type: "slider",
        label: "Rate your overall life satisfaction",
        min: 1,
        max: 10,
        step: 1,
      },
    ],
  },
];

export default onboardingQuestions;
