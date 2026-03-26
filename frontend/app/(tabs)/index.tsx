import { useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const insets = useSafeAreaInsets();

  const titleFall = useRef(new Animated.Value(0)).current;
  const inputFall = useRef(new Animated.Value(0)).current;
  const buttonFall = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const runAnimation = (animation: Animated.CompositeAnimation) =>
    new Promise<void>((resolve) => animation.start(() => resolve()));

  const dropWithBounce = (anim: Animated.Value, toY: number, duration: number) =>
    Animated.sequence([
      Animated.timing(anim, {
        toValue: toY,
        duration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(anim, {
        toValue: 0,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
    ]);

  const runStaggeredGravityDrop = () => {
    const titleAnim = dropWithBounce(titleFall, 90, 280);
    const inputAnim = Animated.sequence([
      Animated.delay(70),
      dropWithBounce(inputFall, 85, 310),
    ]);
    const buttonAnim = Animated.sequence([
      Animated.delay(140),
      dropWithBounce(buttonFall, 80, 340),
    ]);

    return runAnimation(Animated.parallel([titleAnim, inputAnim, buttonAnim]));
  };

  const generateIdeas = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setIdeas([]);
    opacityAnim.setValue(0);
    titleFall.setValue(0);
    inputFall.setValue(0);
    buttonFall.setValue(0);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const fetchPromise = fetch("http://192.168.0.106:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }).then((r) => r.json());

      const animPromise = runStaggeredGravityDrop();

      const data = await Promise.all([fetchPromise, animPromise]).then(
        ([payload]) => payload
      );

      setIdeas(data?.ideas || []);

      await runAnimation(
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        })
      );

    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingTop: insets.top,
      }}
    >
      <Animated.ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={{ transform: [{ scale: scaleAnim }] }}
      >

        {/* Title + Subtitle */}
        <Animated.View style={{ transform: [{ translateY: titleFall }] }}>
          <Text style={{
            fontSize: width * 0.07,
            color: "white",
            textAlign: "center",
            marginTop: 10
          }}>
            ♻️ UpcycleBot
          </Text>

          <Text style={{
            color: "#888",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 20
          }}>
            Turn waste into creativity
          </Text>
        </Animated.View>

        {/* Input */}
        <Animated.View style={{ transform: [{ translateY: inputFall }] }}>
          <TextInput
            placeholder="Enter item (e.g. old t-shirt)"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            style={{
              borderWidth: 2,
              borderColor: "#FFA500",
              padding: 15,
              borderRadius: 10,
              color: "white",
              marginBottom: 15,
              fontSize: width * 0.04,
            }}
          />
        </Animated.View>

        {/* Button */}
        <Animated.View style={{ transform: [{ translateY: buttonFall }] }}>
          <TouchableOpacity
            onPress={generateIdeas}
            activeOpacity={0.9}
            disabled={isGenerating}
            style={{
              backgroundColor: isGenerating ? "#777" : "#4A90E2",
              padding: 15,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {isGenerating ? "✨ Generating magic..." : "Generate Ideas"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Empty State */}
        {ideas.length === 0 && !isGenerating && (
          <Text style={{ color: "#777", textAlign: "center", marginTop: 40 }}>
            Turn waste into ideas ♻️
          </Text>
        )}

        {/* Results */}
        <Animated.View style={{ opacity: opacityAnim }}>
          {ideas.map((idea, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "#111",
                padding: 15,
                borderRadius: 12,
                marginBottom: 15,
                transform: [{ scale: opacityAnim }] // 🔥 subtle pop
              }}
            >
              <Text style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold"
              }}>
                {idea.title}
              </Text>

              <Text style={{ color: "#bbb", marginTop: 5 }}>
                Difficulty: {idea.difficulty}
              </Text>

              <Text style={{ color: "#bbb", marginTop: 5 }}>
                Materials: {idea.materials.join(", ")}
              </Text>

              <Text style={{ color: "white", marginTop: 10 }}>
                Steps:
              </Text>

              {idea.steps.map((step: string, i: number) => (
                <Text key={i} style={{ color: "#ddd" }}>
                  • {step}
                </Text>
              ))}
            </View>
          ))}
        </Animated.View>

      </Animated.ScrollView>
    </SafeAreaView>
  );
}