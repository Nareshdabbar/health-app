import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { useTheme } from "../../theme/ThemeContext";
import { StoreItem } from "../../types/fitness";
import { createStoreStyles } from "./StoreScreen.styles";

const CATEGORIES = [
  {
    id: "cgm",
    label: "CGM",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=80",
  },
  {
    id: "glp1",
    label: "GLP-1 Therapy",
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&q=80",
  },
  {
    id: "supplements",
    label: "Supplements",
    image:
      "https://images.unsplash.com/photo-1579722820308-d7cc58e7fc15?w=200&q=80",
  },
  {
    id: "beverages",
    label: "Beverages",
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&q=80",
  },
  {
    id: "food",
    label: "Food",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80",
  },
  {
    id: "device",
    label: "Device",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=80",
  },
];

const STORE_ITEMS: StoreItem[] = [
  {
    id: "prod_1",
    name: "Sugarfit Smart CGM Sensor (14-Day Wearable)",
    description:
      "Real-time interstitial glucose telemetry. Sub-minute updates, factory-calibrated.",
    category: "cgm",
    price: 3999,
    originalPrice: 6990,
    rating: 4.9,
    reviewsCount: 2400,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
    isBestseller: true,
  },
  {
    id: "prod_2",
    name: "Clinical Smart Body Composition Scale",
    description:
      "Dual-frequency BIA tracking visceral fat index, skeletal muscle mass, and water percentage.",
    category: "device",
    price: 2899,
    originalPrice: 3500,
    rating: 4.8,
    reviewsCount: 1120,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80",
    isBestseller: false,
  },
  {
    id: "prod_3",
    name: "Berberine & Chromium Picolinate Complex",
    description:
      "Pharmaceutical-grade AMPK activator for enhanced postprandial glucose disposal.",
    category: "supplements",
    price: 1199,
    originalPrice: 1499,
    rating: 4.7,
    reviewsCount: 650,
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80",
    isBestseller: true,
  },
];

export const StoreScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createStoreStyles(tokens), [tokens]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartCount, setCartCount] = useState<number>(0);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return STORE_ITEMS;
    return STORE_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (item: StoreItem) => {
    setCartCount((prev) => prev + 1);
    Alert.alert("Cart Updated", `Added ${item.name} to cart!`);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brandTitle}>
              sugarfit
              <Text style={{ color: tokens.colors.primary }}>.store</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cartBtn}
            activeOpacity={0.8}
            onPress={() => Alert.alert("Cart", `${cartCount} items in cart.`)}
          >
            <Text style={{ fontSize: 18 }}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Hero Promo Banner matching SugarFit reference style */}
        <Card variant="obsidian" style={styles.heroBanner}>
          <View style={styles.heroContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>
                Slow Metabolism Holding You Back?
              </Text>
              <Text style={styles.heroSub}>
                Try The 5-Day Outliv Reset Protocol
              </Text>
              <TouchableOpacity
                style={styles.heroCta}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert(
                    "Outliv Reset",
                    "Opening 5-day program details...",
                  )
                }
              >
                <Text style={styles.heroCtaText}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.bannerFooter}>
            <Text style={styles.footerText}>
              Low GI | Manage Weight | Low Sugar Spikes
            </Text>
          </View>
        </Card>

        {/* Shop by Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Categories</Text>
        </View>

        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  isSelected && styles.activeCategoryCard,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(isSelected ? "all" : cat.id)}
              >
                <View style={styles.categoryImageWrapper}>
                  <Image
                    source={{ uri: cat.image }}
                    style={styles.categoryImage}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.activeCategoryText,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Products Section */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "all"
              ? "Featured Clinical Products"
              : `${selectedCategory.toUpperCase()} Products`}
          </Text>
          {selectedCategory !== "all" && (
            <TouchableOpacity onPress={() => setSelectedCategory("all")}>
              <Text
                style={{
                  color: tokens.colors.primary,
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                Show All
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.productsGrid}>
          {filteredItems.map((item) => (
            <Card key={item.id} variant="elevated" style={styles.productCard}>
              <View style={styles.cardTopRow}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productThumbnail}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Badge
                    label={item.isBestseller ? "BESTSELLER" : "FDA APPROVED"}
                    variant="target"
                  />
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>
                </View>
              </View>

              <Text style={styles.productDesc} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>
                  ★ {item.rating} ({item.reviewsCount} reviews)
                </Text>
              </View>

              <View style={styles.cardBottomRow}>
                <View>
                  <Text style={styles.priceLabel}>Direct Price</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Text style={styles.priceValue}>
                      ₹{item.price?.toLocaleString()}
                    </Text>
                    {item.originalPrice && (
                      <Text style={styles.originalPrice}>
                        ₹{item.originalPrice?.toLocaleString()}
                      </Text>
                    )}
                  </View>
                </View>
                <Button
                  label="Add to Cart"
                  variant="primary"
                  size="sm"
                  onPress={() => handleAddToCart(item)}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
