export interface CategoryData {
  id: number;
  name: string;
  description: string;
  active: boolean;
  image: string;
}

export interface CategoryCardProps {
  categoryCardData: CategoryData;
}
