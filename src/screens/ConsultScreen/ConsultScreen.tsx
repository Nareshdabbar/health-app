import React, { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar } from "../../components/atoms/Avatar/Avatar";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Button } from "../../components/atoms/Button/Button";
import { Card } from "../../components/atoms/Card/Card";
import { useBookConsultation } from "../../hooks/useFitnessData";
import { useTheme } from "../../theme/ThemeContext";
import { Specialist } from "../../types/fitness";
import { createConsultStyles } from "./ConsultScreen.styles";

const SPECIALISTS: Specialist[] = [
  {
    id: "doc_1",
    name: "Dr. Sneha Roy",
    title: "Lead Metabolic Diabetologist",
    degrees: "MD, DM (Endocrinology) AIIMS",
    experience: "14+ Years Experience",
    rating: 4.96,
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    availableToday: true,
    bio: "Pioneered glycemic variability stabilization in 4,000+ patients. Focuses on pharmacological tapering via precision insulin sensitivity training.",
  },
  {
    id: "doc_2",
    name: "Dr. Vikram Malhotra",
    title: "Chief Clinical Nutritionist & Dietitian",
    degrees: "Ph.D. Clinical Nutrition, RD (USA)",
    experience: "11+ Years Experience",
    rating: 4.91,
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80",
    availableToday: true,
    bio: "Custom carbohydrate timing protocols designed to flatten postprandial glucose excursions while maintaining high cognitive endurance.",
  },
  {
    id: "doc_3",
    name: "Dr. Ananya Sen",
    title: "Exercise Physiologist & Biomechanist",
    degrees: "MPT (Cardio-Pulmonary), CSCS",
    experience: "9+ Years Experience",
    rating: 4.88,
    avatar:
      "https://images.unsplash.com/photo-1594824813583-16f5c88b0a99?w=200&q=80",
    availableToday: false,
    bio: "Zone-2 mitochondrial biogenesis architect. Programs hypertrophy sequences designed specifically to act as peripheral glucose reservoirs.",
  },
];

export const ConsultScreen: React.FC = () => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createConsultStyles(tokens), [tokens]);

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const bookMutation = useBookConsultation();

  const specialties = [
    "All",
    "Diabetologist",
    "Clinical Nutritionist",
    "Exercise Physiologist",
  ];

  const filteredSpecialists = useMemo(() => {
    if (selectedSpecialty === "All") return SPECIALISTS;
    return SPECIALISTS.filter((doc) =>
      doc.title.toLowerCase().includes(selectedSpecialty.toLowerCase()),
    );
  }, [selectedSpecialty]);

  const handleBook = async (doc: Specialist) => {
    try {
      setActiveBookingId(doc.id);
      await bookMutation.mutateAsync({
        doctorName: doc.name,
        specialty: doc.title,
        doctorAvatar: doc.avatar,
        date: "Today",
        timeSlot: "4:30 PM",
        mode: "video",
        status: "confirmed",
        autoShareCgm: true,
        createdAt: Date.now(),
      });
      Alert.alert(
        "Appointment Confirmed",
        `Appointment confirmed with ${doc.name}! Encrypted room link ready.`,
      );
    } finally {
      setActiveBookingId(null);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Clinical Telehealth</Text>
          <Text style={styles.subtitle}>
            Direct access to verified metabolic specialists
          </Text>
        </View>

        {/* Active Session Notice */}
        <Card variant="obsidian" style={styles.activeRoomCard}>
          <View style={styles.roomHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.livePulse} />
              <Text style={styles.liveText}>NEXT APPOINTMENT</Text>
            </View>
            <Text style={styles.timeTag}>Today • 4:30 PM IST</Text>
          </View>

          <View style={styles.docRow}>
            <Avatar
              uri={SPECIALISTS[0].avatar}
              size="lg"
              withOnlineDot={true}
            />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.roomDocName}>Dr. Sneha Roy, MD</Text>
              <Text style={styles.roomDocSpecialty}>
                Lead Metabolic Diabetologist
              </Text>
              <Text style={styles.roomDocHospital}>
                AIIMS New Delhi • 14 yrs exp
              </Text>
            </View>
          </View>

          <View style={styles.roomActions}>
            <Button
              label="Join Encrypted HD Telehealth Room"
              variant="primary"
              size="md"
              fullWidth
              onPress={() =>
                Alert.alert(
                  "Telehealth Video Room",
                  "Connecting to HIPAA-compliant WebRTC Telehealth Room...",
                )
              }
              leftIconName="📹"
            />
          </View>
        </Card>

        {/* Doctor Directory Header */}
        <View style={styles.dirHeader}>
          <Text style={styles.dirTitle}>Multidisciplinary Care Team</Text>
          <Text style={styles.dirSub}>
            Select a clinician for continuous data review & counseling
          </Text>
        </View>

        {/* Specialty Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specFilter}
        >
          {specialties.map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.specBtn,
                selectedSpecialty === spec && styles.activeSpecBtn,
              ]}
              onPress={() => setSelectedSpecialty(spec)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.specText,
                  selectedSpecialty === spec && styles.activeSpecText,
                ]}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Doctors List */}
        <View style={styles.doctorsList}>
          {filteredSpecialists.map((doc) => {
            const isThisCardLoading = activeBookingId === doc.id;
            return (
              <Card key={doc.id} variant="elevated" style={styles.doctorCard}>
                <View style={styles.doctorHeader}>
                  <Avatar
                    uri={doc.avatar}
                    size="lg"
                    withOnlineDot={doc.availableToday}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.doctorName}>{doc.name}</Text>
                    <Text style={styles.doctorRole}>{doc.title}</Text>
                    <Text style={styles.doctorHospital}>{doc.degrees}</Text>
                  </View>
                  <Badge
                    label={
                      doc.availableToday ? "AVAILABLE TODAY" : "NEXT: TOMORROW"
                    }
                    variant={doc.availableToday ? "target" : "neutral"}
                  />
                </View>

                <Text style={styles.doctorBio}>{doc.bio}</Text>

                <View style={styles.doctorFooter}>
                  <View>
                    <Text style={styles.slotLabel}>Consultation Fee</Text>
                    <Text style={styles.slotTime}>₹899 / Session</Text>
                  </View>
                  <Button
                    label={isThisCardLoading ? "Booking..." : "Book 1-on-1"}
                    variant="primary"
                    size="sm"
                    loading={isThisCardLoading}
                    onPress={() => handleBook(doc)}
                  />
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
