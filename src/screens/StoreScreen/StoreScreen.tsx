import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { useTheme } from "../../theme/ThemeContext";
import { StoreItem } from "../../types/fitness";
import { createStoreStyles } from "./StoreScreen.styles";

const CATEGORIES = [
  { id: "all", label: "All Items", icon: "⚡" },
  { id: "cgm", label: "CGM", icon: "📡" },
  { id: "glp1", label: "GLP 1 Weight Loss Therapy", icon: "🧬" },
  { id: "supplements", label: "Supplements", icon: "💊" },
  { id: "beverages", label: "Beverages", icon: "🍵" },
  { id: "food", label: "Food", icon: "🥗" },
  { id: "device", label: "Device", icon: "⌚" },
];

const SUB_FILTERS = [
  { id: "all", label: "All" },
  { id: "daily", label: "Daily Health" },
  { id: "sugar", label: "Sugar Control" },
];

const PROMO_SLIDES = [
  {
    id: "slide_1",
    title: "Slow Metabolism Holding You Back?",
    subtitle: "Try The 5-Day Outliv Reset",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
    tag: "GET STARTED",
  },
  {
    id: "slide_2",
    title: "Know Your Sugar Own Your Health",
    subtitle: "No Guessing. Just Real-Time Insights With Cgm.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80",
    tag: "GET CGM",
  },
];

// Dynamic API fetcher connecting to items backend
const fetchStoreProducts = async ({ pageParam = 0 }) => {
  const PAGE_SIZE = 10;
  const MAX_LIMIT = 40;

  if (pageParam >= MAX_LIMIT) {
    return { items: [], nextPage: undefined };
  }

  const response = await fetch(
    `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${pageParam}`,
  );
  const data = await response.json();

  const categoryKeys: Array<
    "cgm" | "glp1" | "supplements" | "beverages" | "food" | "device"
  > = ["cgm", "glp1", "supplements", "beverages", "food", "device"];

  const mappedItems: StoreItem[] = data.products.map(
    (p: any, index: number) => {
      const assignedCategory =
        categoryKeys[(pageParam + index) % categoryKeys.length];

      let customName = p.title;
      if (assignedCategory === "supplements") {
        customName = "Magnesium 5X Capsule";
      } else if (assignedCategory === "food") {
        customName = "Fermented Yeast Protein Powder";
      }

      const discountPercent = 10 + ((p.id * 3) % 20); // 10% to 30% off

      return {
        id: `prod_${p.id}`,
        name: customName,
        description: p.description,
        category: assignedCategory,
        price: Math.round(p.price * 40),
        originalPrice: Math.round(p.price * 55),
        discount: `Upto ${discountPercent}% Off`,
        rating: p.rating || 4.8,
        reviewsCount: p.stock ? p.stock * 12 : 180,
        image:
          p.thumbnail ||
          p.images?.[0] ||
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
        isBestseller: p.rating > 4.5,
      };
    },
  );

  const nextSkip = pageParam + PAGE_SIZE;
  const hasMore = nextSkip < Math.min(data.total, MAX_LIMIT);

  return {
    items: mappedItems,
    nextPage: hasMore ? nextSkip : undefined,
  };
};

export const StoreScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createStoreStyles(tokens), [tokens]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>("all");
  const [cartCount, setCartCount] = useState<number>(0);
  const [, setActiveSlide] = useState<number>(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["store-products-infinite"],
      queryFn: fetchStoreProducts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return allProducts;
    return allProducts.filter((item) => item.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  const handleAddToCart = (item: StoreItem) => {
    setCartCount((prev) => prev + 1);
    Alert.alert("Added to Cart", `${item.name} has been added successfully.`);
  };

  // Render 2-Column Product Grid Item matching the reference layout cleanly with NO gap rows
  const renderProductItem = ({ item }: { item: StoreItem }) => (
    <Card variant="elevated" style={styles.productCard}>
      {/* Discount Banner Tag */}
      {item?.discount && (
        <View style={styles.discountBadgeContainer}>
          <Text style={styles.discountBadgeText}>{item?.discount}</Text>
        </View>
      )}

      <Image source={{ uri: item.image }} style={styles.productThumbnail} />

      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>

      <View style={styles.cardBottomRow}>
        <View>
          <Text style={styles.priceValue}>
            ₹{item.price?.toLocaleString()}
            <Text style={styles.unitText}>/unit</Text>
          </Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              MRP: ₹{item.originalPrice?.toLocaleString()}
            </Text>
          )}
        </View>
        <Button
          label="ADD"
          variant="primary"
          size="sm"
          onPress={() => handleAddToCart(item)}
        />
      </View>
    </Card>
  );

  const renderHeader = () => (
    <View>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <Text style={styles.brandTitle}>
          metabolic
          <Text style={{ color: tokens.colors.primary }}>.store</Text>
        </Text>
        <TouchableOpacity
          style={styles.searchIconBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Search", "Open store product search")}
        >
          <Text style={{ fontSize: 16 }}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Promo Banner Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const slideIndex = Math.round(
            e.nativeEvent.contentOffset.x /
              (Dimensions.get("window").width - 32),
          );
          if (!isNaN(slideIndex)) setActiveSlide(slideIndex);
        }}
        scrollEventThrottle={16}
        style={styles.carouselContainer}
      >
        {PROMO_SLIDES.map((slide) => (
          <Card key={slide.id} variant="obsidian" style={styles.heroBanner}>
            <View style={styles.heroContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>{slide.title}</Text>
                <Text style={styles.heroSub}>{slide.subtitle}</Text>
                <TouchableOpacity
                  style={styles.heroCta}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Action", "Opening protocol details...")
                  }
                >
                  <Text style={styles.heroCtaText}>{slide.tag}</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: slide.image }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* Trust Highlight Ticker Banner */}
      <View style={styles.tickerBanner}>
        <Text style={styles.tickerText}>
          Low GI | Manage weight | Low Sugar Spikes
        </Text>
      </View>

      {/* Shop by Categories Grid (2 rows / Horizontal Scroll Cards like reference) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shop by Categories</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
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
              onPress={() => setSelectedCategory(cat.id)}
            >
              <View style={styles.categoryIconCircle}>
                <Text style={{ fontSize: 22 }}>{cat.icon}</Text>
              </View>
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.activeCategoryText,
                ]}
                numberOfLines={2}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Our Product Range Section Header */}
      <View style={[styles.sectionHeader, { marginTop: 12 }]}>
        <Text style={styles.sectionTitle}>Our Product Range</Text>
      </View>

      {/* Sub Filter Pill Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.subFilterScroll}
      >
        {SUB_FILTERS.map((filter) => {
          const isSelected = selectedSubFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.subFilterPill,
                isSelected && styles.activeSubFilterPill,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedSubFilter(filter.id)}
            >
              <Text
                style={[
                  styles.subFilterText,
                  isSelected && styles.activeSubFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {isLoading && allProducts.length === 0 && (
        <View style={{ paddingVertical: 30, alignItems: "center" }}>
          <ActivityIndicator size="small" color={tokens.colors.primary} />
        </View>
      )}
    </View>
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 16, alignItems: "center" }}>
          <ActivityIndicator size="small" color={tokens.colors.primary} />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.safeArea}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
