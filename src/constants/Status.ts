import {
  Layers,
  ImageUpIcon,
  FileBracesIcon,
  HourglassIcon,
  FileWarning,
} from 'lucide-react';

export const statusOptions = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'uploaded', label: 'Uploaded', icon: ImageUpIcon },
  { id: 'analyzed', label: 'Analyzed', icon: FileBracesIcon },
  { id: 'analyzing', label: 'Analyzing', icon: HourglassIcon },
  { id: 'failed', label: 'Failed', icon: FileWarning },
];

export const statusMap = Object.fromEntries(
  statusOptions.map((s) => [s.id.toUpperCase(), s]),
);
