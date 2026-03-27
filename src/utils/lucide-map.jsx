import React from 'react';
import {
  Database,
  Smartphone,
  BarChart3,
  Bot,
  Leaf,
  HeartPulse,
  Coffee,
  Globe,
  TrendingUp,
  Shield,
  Target,
  ArrowRight,
  X,
  Download,
  Users,
  Search,
  Check,
  ChevronRight
} from 'lucide-react';

const iconMap = {
  Database,
  Smartphone,
  BarChart3,
  Bot,
  Leaf,
  HeartPulse,
  Coffee,
  Globe,
  TrendingUp,
  Shield,
  Target,
  ArrowRight,
  X,
  Download,
  Users,
  Search,
  Check,
  ChevronRight
};

export const getIcon = (name, props = {}) => {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default iconMap;
