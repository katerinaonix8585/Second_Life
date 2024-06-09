export interface CategoryData {
  id: number;
  name: string;
  description: string;
  active: boolean;
  image: number;
}

export interface CategoryCardProps {
  categoryCardData: CategoryData;
}
