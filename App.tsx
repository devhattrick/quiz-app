import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Button,
  Modal,
  Alert,
  Pressable,
} from "react-native";

type Quiz = QuizOption[];
interface QuizOption {
  question: string;
  options: string[];
  answer: string;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const quizDataMaster:Quiz = [
    {
      question: "What does ABS stand for in automotive terms?",
      options: [
        "Automated Brake System",
        "Anti-lock Braking System",
        "Auxiliary Brake System",
        "Advanced Braking System",
      ],
      answer: "Anti-lock Braking System",
    },
    {
      question: "Which company manufactures the Model S?",
      options: ["Nissan", "Tesla", "Ford", "Chevrolet"],
      answer: "Tesla",
    },
    {
      question:
        "What is the name of the luxury car brand that is a division of Toyota?",
      options: ["Infiniti", "Acura", "Lexus", "Genesis"],
      answer: "Lexus",
    },
    {
      question: "In which country is the car brand Volvo based?",
      options: ["Germany", "Japan", "Sweden", "South Korea"],
      answer: "Sweden",
    },
    {
      question: "Which car manufacturer produces the Mustang?",
      options: ["Chevrolet", "Dodge", "Ford", "Chrysler"],
      answer: "Ford",
    },
    {
      question: "What type of car is the Porsche 911?",
      options: ["Sedan", "Coupe", "SUV", "Hatchback"],
      answer: "Coupe",
    },
    {
      question:
        "Which car brand uses the slogan 'The Ultimate Driving Machine'?",
      options: ["Audi", "Mercedes-Benz", "BMW", "Jaguar"],
      answer: "BMW",
    },
    {
      question:
        "Which car is known as the 'people's car' and was originally designed in Nazi Germany?",
      options: ["Fiat 500", "Mini Cooper", "Volkswagen Beetle", "Citroën 2CV"],
      answer: "Volkswagen Beetle",
    },
    {
      question: "Which car brand has a logo featuring a prancing horse?",
      options: ["Ferrari", "Lamborghini", "Maserati", "Alfa Romeo"],
      answer: "Ferrari",
    },
    {
      question: "What is the best-selling car model of all time?",
      options: [
        "Honda Civic",
        "Ford F-Series",
        "Volkswagen Golf",
        "Toyota Corolla",
      ],
      answer: "Toyota Corolla",
    },
    {
      question: "Which company owns the luxury brand Bentley?",
      options: ["Ford", "BMW", "Volkswagen", "Daimler AG"],
      answer: "Volkswagen",
    },
    {
      question: "Which car was famously driven by James Bond in 'Goldfinger'?",
      options: [
        "Aston Martin DB5",
        "Jaguar E-Type",
        "BMW Z3",
        "Mercedes-Benz 300SL",
      ],
      answer: "Aston Martin DB5",
    },
    {
      question: "What does RPM stand for in the context of engines?",
      options: [
        "Rotations Per Minute",
        "Revolutions Per Minute",
        "Rates Per Minute",
        "Rotations Per Mile",
      ],
      answer: "Revolutions Per Minute",
    },
    {
      question:
        "Which car brand introduced the first mass-produced hybrid car?",
      options: ["Honda", "Nissan", "Toyota", "Chevrolet"],
      answer: "Toyota",
    },
    {
      question:
        "What is the name of the system that improves a car’s stability by reducing the likelihood of skidding?",
      options: [
        "Traction Control System",
        "Electronic Stability Control",
        "Anti-lock Braking System",
        "Brake Assist System",
      ],
      answer: "Electronic Stability Control",
    },
    {
      question: "What kind of engine layout does a Subaru WRX have?",
      options: ["V6", "Inline-4", "Boxer-4", "V8"],
      answer: "Boxer-4",
    },
    {
      question: "Which company produces the luxury SUV model, the Range Rover?",
      options: ["BMW", "Land Rover", "Mercedes-Benz", "Audi"],
      answer: "Land Rover",
    },
    {
      question:
        "Which car manufacturer created the Quattro, famous for its four-wheel-drive technology?",
      options: ["Porsche", "Audi", "BMW", "Subaru"],
      answer: "Audi",
    },
    {
      question: "Which car company uses the tagline 'Zoom-Zoom'?",
      options: ["Mazda", "Mitsubishi", "Nissan", "Suzuki"],
      answer: "Mazda",
    },
    {
      question: "In what year was Ford Motor Company founded?",
      options: ["1900", "1903", "1910", "1913"],
      answer: "1903",
    },
    {
      question: "Which car brand is known for its rotary engine technology?",
      options: ["Subaru", "Mazda", "Mitsubishi", "Toyota"],
      answer: "Mazda",
    },
    {
      question: "What car model was known as the 'Silver Ghost'?",
      options: ["Rolls-Royce", "Bentley", "Mercedes-Benz", "Aston Martin"],
      answer: "Rolls-Royce",
    },
    {
      question: "Which car brand has a logo with four interlocked rings?",
      options: ["Audi", "Subaru", "Chrysler", "Alfa Romeo"],
      answer: "Audi",
    },
    {
      question:
        "What is the main material used in the construction of the body of the DeLorean DMC-12?",
      options: ["Aluminum", "Fiberglass", "Stainless Steel", "Carbon Fiber"],
      answer: "Stainless Steel",
    },
    {
      question:
        "Which Italian company is known for manufacturing sports cars and motorcycles?",
      options: ["Maserati", "Ferrari", "Ducati", "Aprilia"],
      answer: "Ducati",
    },
    {
      question: "What type of car is a Honda CR-V?",
      options: ["Sedan", "SUV", "Coupe", "Hatchback"],
      answer: "SUV",
    },
    {
      question: "Which company produces the electric car model Leaf?",
      options: ["BMW", "Nissan", "Chevrolet", "Tesla"],
      answer: "Nissan",
    },
    {
      question:
        "Which car manufacturer uses the 'Spirit of Ecstasy' hood ornament?",
      options: ["Rolls-Royce", "Bentley", "Jaguar", "Aston Martin"],
      answer: "Rolls-Royce",
    },
    {
      question: "What does the ‘GT’ in Ford GT stand for?",
      options: [
        "Grand Tourer",
        "Gran Turismo",
        "Grand Transport",
        "Great Torque",
      ],
      answer: "Gran Turismo",
    },
    {
      question: "Which car company manufactures the Corvette?",
      options: ["Dodge", "Chevrolet", "Ford", "Cadillac"],
      answer: "Chevrolet",
    },
  ];


  // TODO Function random quiz: Sort random 
  // const randomQuiz = () => {};
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setCount(0);
    console.log("Refresh::", count);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text>Scroll down to refresh {count}</Text>
          <Button title="BTN" onPress={() => setCount(count + 1)} />

          <ScrollView>
            <View>
              {quizDataMaster.map(
                (item:QuizOption) => {
                  return (
                    <View style={styles.questionContainer}>
                      <Text style={styles.questionText}>{item.question}</Text>
                      {item.options.map((ans:string,index:number) => {
                        return (
                          <View style={styles.optionsText}>
                            <Text>{`${index+1}: ${ans}`}</Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                }
              )}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View >
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
    // backgroundColor: 'pink',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    marginTop: 10,
  },
  questionContainer: {
    backgroundColor: "#f0eee9",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  questionText: {
    // backgroundColor: "#afc2d2",
    fontWeight: "bold",
    alignItems: "center",
    margin: 10,
  },
  optionsText: {
    backgroundColor: "#cfc8bd",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    // borderColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
