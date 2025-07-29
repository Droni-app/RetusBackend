import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

interface CategoryData {
  name: string
  slug: string
  icon: string
  description: string
  parentId?: string | null
  children?: CategoryData[]
}

interface CategoriesFile {
  categories: CategoryData[]
}

export default class extends BaseSeeder {
  async run() {
    try {
      // Leer el archivo JSON
      const categoriesPath = join(process.cwd(), 'categories.json')
      const categoriesContent = await readFile(categoriesPath, 'utf-8')
      const categoriesData: CategoriesFile = JSON.parse(categoriesContent)

      // Función recursiva para crear categorías
      const createCategories = async (
        categories: CategoryData[],
        parentId: string | null = null
      ): Promise<void> => {
        for (const categoryData of categories) {
          // Verificar si la categoría ya existe
          const existingCategory = await Category.findBy('slug', categoryData.slug)

          if (!existingCategory) {
            // Crear la categoría padre
            const category = await Category.create({
              name: categoryData.name,
              slug: categoryData.slug,
              icon: categoryData.icon,
              description: categoryData.description,
              parentId: parentId,
            })

            console.log(`✅ Categoría creada: ${category.name}`)

            // Crear las subcategorías si existen
            if (categoryData.children && categoryData.children.length > 0) {
              await createCategories(categoryData.children, category.id)
            }
          } else {
            console.log(`⚠️  Categoría ya existe: ${categoryData.name}`)

            // Si la categoría existe pero tiene hijos, procesarlos también
            if (categoryData.children && categoryData.children.length > 0) {
              await createCategories(categoryData.children, existingCategory.id)
            }
          }
        }
      }

      // Crear todas las categorías
      await createCategories(categoriesData.categories)

      console.log('🎉 Seeder de categorías completado exitosamente')
    } catch (error) {
      console.error('❌ Error al ejecutar el seeder de categorías:', error)
      throw error
    }
  }
}
