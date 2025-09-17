import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, categoryEndpoints } from '../../api/api'

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(categoryEndpoints.getCategories)
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories')
    }
  }
)

// Fetch subcategories for a specific category
export const fetchSubcategories = createAsyncThunk(
  'categories/fetchSubcategories',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(categoryEndpoints.getSubcategories(categoryId))
      return { categoryId, data: response }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch subcategories')
    }
  }
)

const initialState = {
  categories: [],
  subcategories: {},
  selectedCategory: null,
  selectedSubcategory: null,
  loading: false,
  error: null,
  subcategoriesLoading: false,
  subcategoriesError: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload
      state.selectedSubcategory = null // Reset subcategory selection
    },
    selectSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload
    },
    clearSelection: (state) => {
      state.selectedCategory = null
      state.selectedSubcategory = null
    },
    clearError: (state) => {
      state.error = null
      state.subcategoriesError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories cases
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch subcategories cases
      .addCase(fetchSubcategories.pending, (state) => {
        state.subcategoriesLoading = true
        state.subcategoriesError = null
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategoriesLoading = false
        state.subcategories[action.payload.categoryId] = action.payload.data
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.subcategoriesLoading = false
        state.subcategoriesError = action.payload
      })
  },
})

export const {
  selectCategory,
  selectSubcategory,
  clearSelection,
  clearError,
} = categoriesSlice.actions

export default categoriesSlice.reducer
