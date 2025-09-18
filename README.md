# Zareshop Web

A Vite + React app with Redux Toolkit for state management. It supports vendor onboarding and product management (create, edit, delete, media upload), and public browsing for clients.

## Quick Start

1) Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)

2) Install
```bash
npm install
```

3) Environment
Create a `.env` file in the project root with:
```bash
VITE_BASE_URL=http://localhost:4000/api
```
- Set this to the same base segment where your backend is mounted. For example, if your server mounts product routes at `/api/products`, the base must end with `/api`.

4) Run
```bash
npm run dev
```
Open http://localhost:5173 (or the printed URL).

## Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Production build
- `npm run preview`: Preview build locally

## Project Structure
```
src/
  api/
    api.js                  # fetch wrapper (get/post/put/delete)
  features/
    auth/
      authSlice.js          # login/forgot, token + me
    categories/
      categoriesSlice.js    # fetch categories & subcategories
    products/
      vendorProductsSlice.js# vendor CRUD, media thunks
      clientProductsSlice.js# public list & detail thunks
    ui/
      loadingSlice.js       # global loading overlay
  pages/
    HomePage.jsx            # public products list (real API)
    ProductDetails.jsx      # public product detail (real API)
    vendor/
      VendorLayout.jsx      # gated vendor area
      VendorProducts.jsx    # vendor product list
      VendorProductCreate.jsx
      VendorProductDetail.jsx
      WaitApproval.jsx
      *.module.scss         # page-scoped styles
  store/
    store.js                # Redux store registration
  ui/
    ConfirmModal.jsx        # reusable confirm dialog
    ConfirmModal.module.scss
styles/
  global.scss               # app-wide typography/buttons/colors
```

## Environment & API
- `VITE_BASE_URL` is prefixed to all `api.js` calls.
- Endpoints used (examples):
  - Public:
    - `GET /products` (list)
    - `GET /products/:id` (detail)
  - Vendor (authenticated):
    - `GET /products/my-products`
    - `POST /products` (multipart)
    - `PUT /products/:id` (multipart)
    - `DELETE /products/:id`
    - `PUT /products/:id/images` (multipart images[])
    - `DELETE /products/:id/images/:imageId`
    - `PUT /products/:id/videos` (multipart videos[])
    - `DELETE /products/:id/videos/:videoId`

## Redux Overview
- `authSlice.js`
  - `login`, `fetchMe`
  - `selectIsVendorApproved`
- `categoriesSlice.js`
  - `fetchCategories`, `fetchSubcategories`
- `vendorProductsSlice.js`
  - `fetchMyProducts`, `createProduct`, `fetchProductById`, `updateProduct`, `deleteProduct`
  - `updateProductImages`, `deleteProductImage`, `updateProductVideos`, `deleteProductVideo`
  - Files are posted as FormData. `specs` is sent as a JSON string and parsed server-side.
- `clientProductsSlice.js`
  - `fetchProducts` (public list), `fetchProductById` (public detail)

## Styling & UX
- Page-level styles live in `*.module.scss` next to each page.
- Global utilities & theme in `styles/global.scss`.
- Custom confirm modal at `src/ui/ConfirmModal.jsx` is used for destructive actions (image/video delete).
- Vendor UI has a consistent header with a back button.

## Conventions
- No direct API calls in components. Use Redux thunks.
- Token is read from Redux (`state.auth.token`).
- Avoid inline styles; prefer SCSS modules.

## Common Issues
- 404 on API calls
  - Ensure `VITE_BASE_URL` matches your backend mount. If backend mounts at `/api/products`, set `VITE_BASE_URL=.../api`.
- Multipart + specs
  - `specs` must be a JSON string (handled in thunks). Backend should parse via `jsonFieldsParser(['specs'])`.

## Deploy
Any static host compatible with Vite builds (Netlify, Vercel, etc.).
```bash
npm run build
# deploy dist/
```

## License
MIT
