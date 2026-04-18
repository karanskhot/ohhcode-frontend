import { Flame, Gauge, Leaf, Trophy } from 'lucide-react';

const difficultyOptions = [
  {
    id: 'easy',
    label: 'Easy',
    icon: Leaf,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'medium',
    label: 'Medium',
    icon: Gauge,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    id: 'high',
    label: 'High',
    icon: Flame,
    color: 'text-orange-600',
    bg: 'bg-orange-600/10',
  },
  {
    id: 'ambitious',
    label: 'Ambitious',
    icon: Trophy,
    color: 'text-purple-600',
    bg: 'bg-purple-600/10',
  },
];

export default difficultyOptions;
