import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      taskCount: 0,
      position: categories.length + 1,
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(300);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    categories[index] = { ...categories[index], ...categoryData };
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(300);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    categories.splice(index, 1);
    return { success: true };
  },

  async updateTaskCount(categoryId, increment) {
    await delay(100);
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      category.taskCount += increment;
    }
  }
};