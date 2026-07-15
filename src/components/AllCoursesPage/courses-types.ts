export interface Course {
  _id: string;
  title: string;
  thumbnailUrl?: string;
  category?: string;
  difficulty?: string;
  instructorName?: string;
  image?: string;
  price?: number;
  discountPrice?: number;
  isFree?: boolean;
  studentsEnrolled?: number;
  estimatedDuration?: string;
  lessons?: number;
  rating?: number;
  createdAt?: string;
}

export interface InitialFilters {
  q: string;
  category: string;
  level: string;
  duration: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  sortBy: string;
}

export interface FilterState {
  search: string;
  selectedCategory: string;
  selectedLevel: string;
  selectedDuration: string;
  minPrice: string;
  maxPrice: string;
  minRating: number;
  sortBy: string;
  hasActiveFilters: boolean;
}

export const CATEGORIES = [
  'All',
  'Development',
  'Design',
  'Marketing',
  'Business',
  'Photography',
  'Music',
  'Health',
  'Finance',
];

export const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export const DURATIONS = [
  { label: 'All', value: 'all' },
  { label: 'Under 2 Hours', value: 'under2' },
  { label: '2–5 Hours', value: '2to5' },
  { label: '5–10 Hours', value: '5to10' },
  { label: '10+ Hours', value: 'over10' },
];

export const SORT_OPTIONS = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Lowest Price', value: 'price_asc' },
  { label: 'Highest Price', value: 'price_desc' },
];
