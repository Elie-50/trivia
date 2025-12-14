import { useEffect } from 'react';
import { useCategoryStore } from '@/store/useCategory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CategorySelectorProps = {
	onSelectChanged: (value: number) => void;
}

function CategorySelector({ onSelectChanged }: CategorySelectorProps) {
  const { categories, selectedCategory, fetchCategories, setSelectedCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

	const handleValueChanged = (value: string) => {
		const selectedCtg = Number(value);

		setSelectedCategory(selectedCtg);
		onSelectChanged(selectedCtg);
	}

  return (
    <div>
      <label htmlFor="category" className="block text-lg mb-2">
        Select Category
      </label>
      <Select
        value={selectedCategory?.toString() || ''}
        onValueChange={handleValueChanged}
      >
        <SelectTrigger className="w-full p-3 border rounded-md bg-white shadow-sm">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CategorySelector;
