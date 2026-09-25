import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createBottomTabBarStyles } from './BottomTabBar.styles';

export type NavTab = 'home' | 'programs' | 'vitals' | 'consult' | 'store';

export interface BottomTabBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenLogModal: () => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onSelectTab,
  onOpenLogModal,
}) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => createBottomTabBarStyles(tokens), [tokens]);

  const tabs: Array<{ id: NavTab; label: string; icon: string }> = [
    { id: 'home', label: 'Overview', icon: '⚡' },
    { id: 'programs', label: 'Programs', icon: '📋' },
    { id: 'vitals', label: 'Vitals', icon: '📈' },
    { id: 'consult', label: 'Consult', icon: '🩺' },
    { id: 'store', label: 'Store', icon: '🛍️' },
  ];

  return (
    <View style={styles.container}>
      {tabs.slice(0, 2).map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Floating Center Quick-Log Button */}
      <View style={styles.quickLogWrapper}>
        <TouchableOpacity
          style={styles.quickLogButton}
          onPress={onOpenLogModal}
          activeOpacity={0.8}
        >
          <Text style={styles.quickLogIcon}>+</Text>
        </TouchableOpacity>
      </View>

      {tabs.slice(2).map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabButton}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
