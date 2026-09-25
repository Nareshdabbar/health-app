// E:\app\src\components\organisms\WellnessHub\WellnessHub.tsx
import { useTheme } from "@/src/theme/ThemeContext";
import React, { useMemo, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { createWellnessStyles } from "./WellnessScreen.styles";

export const WellnessScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createWellnessStyles(tokens), [tokens]);
  const [activeTab, setActiveTab] = useState<"nutrition" | "mindfulness">(
    "nutrition",
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>Your Wellness Hub</Text>

      {/* Segmented Switcher */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            activeTab === "nutrition" && styles.activeSegment,
          ]}
          onPress={() => setActiveTab("nutrition")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === "nutrition" && styles.activeSegmentText,
            ]}
          >
            Nutrition
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentButton,
            activeTab === "mindfulness" && styles.activeSegment,
          ]}
          onPress={() => setActiveTab("mindfulness")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === "mindfulness" && styles.activeSegmentText,
            ]}
          >
            Mindfulness
          </Text>
        </TouchableOpacity>
      </View>

      {/* NUTRITION TAB VIEW */}
      {activeTab === "nutrition" && (
        <View style={styles.tabContent}>
          {/* Calorie Stats Card */}
          <View style={styles.nutritionCard}>
            <View style={styles.calorieInfoBox}>
              <Text style={styles.calorieHeaderTitle}>
                Today's Consumed Calories
              </Text>
              <Text style={styles.calorieValue}>0</Text>

              <View style={styles.macroList}>
                <View style={styles.macroRow}>
                  <Text style={styles.macroLabel}>FAT</Text>
                  <Text style={styles.macroVal}>0 g</Text>
                </View>
                <View style={styles.macroRow}>
                  <Text style={styles.macroLabel}>FIBRE</Text>
                  <Text style={styles.macroVal}>0 g</Text>
                </View>
                <View style={styles.macroRow}>
                  <Text style={styles.macroLabel}>CARBS</Text>
                  <Text style={styles.macroVal}>0 g</Text>
                </View>
                <View style={styles.macroRow}>
                  <Text style={styles.macroLabel}>PROTEIN</Text>
                  <Text style={styles.macroVal}>0 g</Text>
                </View>
              </View>

              <Text style={styles.insightNote}>
                This does not include insights logged by image
              </Text>
            </View>

            <View style={styles.trackActionRow}>
              <Text style={styles.trackText}>Track calorie intake</Text>
              <TouchableOpacity style={styles.logMealBtn}>
                <Text style={styles.logMealBtnText}>Log Meal</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recommended Recipes */}
          <Text style={styles.sectionHeading}>Recommended Recipes</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <View style={styles.recipeCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
                }}
                style={styles.recipeImageBackground}
              >
                <View style={styles.recipeGradientOverlay} />
                <Text style={styles.recipeTitle}>
                  Grilled Chicken Greek Salad
                </Text>
              </ImageBackground>
            </View>

            <View style={styles.recipeCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
                }}
                style={styles.recipeImageBackground}
              >
                <View style={styles.recipeGradientOverlay} />
                <Text style={styles.recipeTitle}>Bengal Gram Salad</Text>
              </ImageBackground>
            </View>
          </ScrollView>

          {/* Recipe By Carbs Content */}
          <Text style={styles.sectionHeading}>Recipe By Carbs Content</Text>
          <View style={styles.carbGrid}>
            <View style={styles.carbCategoryCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
                }}
                style={styles.recipeImageBackground}
              >
                <View style={styles.recipeGradientOverlay} />
                <Text style={styles.carbCategoryText}>Under 15 gms</Text>
              </ImageBackground>
            </View>

            <View style={styles.carbCategoryCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
                }}
                style={styles.recipeImageBackground}
              >
                <View style={styles.recipeGradientOverlay} />
                <Text style={styles.carbCategoryText}>15-30 gms</Text>
              </ImageBackground>
            </View>

            <View style={styles.carbCategoryCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
                }}
                style={styles.recipeImageBackground}
              >
                <View style={styles.recipeGradientOverlay} />
                <Text style={styles.carbCategoryText}>30-50 gms</Text>
              </ImageBackground>
            </View>

            <View style={styles.carbCategoryCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500",
                }}
                style={styles.recipeImageBackground}
              >
                <View style={styles.recipeGradientOverlay} />
                <Text style={styles.carbCategoryText}>50-75 gms</Text>
              </ImageBackground>
            </View>
          </View>
        </View>
      )}

      {/* MINDFULNESS TAB VIEW */}
      {activeTab === "mindfulness" && (
        <View style={styles.tabContent}>
          <View style={styles.mindfulHeroCard}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
              }}
              style={styles.recipeImageBackground}
            >
              <View style={styles.recipeGradientOverlay} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroSub}>by Sugar.fit</Text>
                <Text style={styles.heroTitle}>
                  Choose to Lose & Walk the Talk
                </Text>
                <TouchableOpacity
                  style={styles.playNowBtn}
                  activeOpacity={0.85}
                >
                  <Text style={styles.playNowText}>Play Now</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          {/* Section: 5 Minutes Meditation */}
          <Text style={styles.sectionHeading}>5 Minutes Meditation</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <View style={styles.meditationCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500",
                }}
                style={styles.meditationThumb}
              />
              <Text style={styles.meditationName}>Stop Panic</Text>
              <Text style={styles.meditationSessions}>1 Session</Text>
            </View>
            <View style={styles.meditationCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500",
                }}
                style={styles.meditationThumb}
              />
              <Text style={styles.meditationName}>Boost Confidence</Text>
              <Text style={styles.meditationSessions}>1 Session</Text>
            </View>
          </ScrollView>

          {/* Section: Breath & Relaxation */}
          <Text style={styles.sectionHeading}>Breath & Relaxation</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <View style={styles.meditationCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
                }}
                style={styles.meditationThumb}
              />
              <Text style={styles.meditationName}>Pranayama Series - 1</Text>
              <Text style={styles.meditationSessions}>7 Sessions</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};
