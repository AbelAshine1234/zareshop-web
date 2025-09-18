import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import s from './VendorProductDetail.module.scss'
import { fetchCategories, fetchSubcategories } from '../../features/categories/categoriesSlice'
import { fetchProductById, updateProduct, deleteProduct } from '../../features/products/vendorProductsSlice'
import { showLoading, hideLoading } from '../../features/ui/loadingSlice'

export default function VendorProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { current, currentLoading, currentError, updating, updateError, deleting, deleteError } = useSelector((st) => st.vendorProducts)
  const categories = useSelector((st) => st.categories?.categories) || []
  const subcategoriesMap = useSelector((st) => st.categories?.subcategories) || {}

  // local editable state
  const [form, setForm] = useState({
    name: '',
    description: '',
    has_discount: false,
    sold_in_bulk: false,
    used: false,
    stock: 0,
    category_id: '',
    subcategory_id: '',
    specs: [{ key: '', value: '' }],
    images: [],
    videos: [],
  })

  const imagesInputRef = useRef(null)
  const videosInputRef = useRef(null)

  useEffect(() => {
    if (!id) return
    dispatch(fetchProductById(id))
    dispatch(fetchCategories())
  }, [id, dispatch])

  // hydrate local form when product loads
  useEffect(() => {
    if (!current) return
    setForm((prev) => ({
      ...prev,
      name: current.name || '',
      description: current.description || '',
      has_discount: !!current.has_discount,
      sold_in_bulk: !!current.sold_in_bulk,
      used: !!current.used,
      stock: Number(current.stock || 0),
      category_id: current.category_id || '',
      subcategory_id: current.subcategory_id || '',
      specs: Array.isArray(current.specs) && current.specs.length ? current.specs.map((sp) => ({ key: sp.key || '', value: sp.value || '' })) : [{ key: '', value: '' }],
      images: [], // new images to add
      videos: [], // new videos to add
    }))
    if (current.category_id) dispatch(fetchSubcategories(current.category_id))
  }, [current, dispatch])

  // when category changes from form, fetch subcategories
  useEffect(() => {
    if (form.category_id) dispatch(fetchSubcategories(form.category_id))
  }, [form.category_id, dispatch])

  const updateField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }))
  const updateSpec = (i, k, v) => setForm(prev => ({ ...prev, specs: prev.specs.map((s, idx) => idx === i ? { ...s, [k]: v } : s) }))
  const addSpec = () => setForm(prev => ({ ...prev, specs: [...prev.specs, { key: '', value: '' }] }))
  const removeSpec = (i) => setForm(prev => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }))

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files || [])
    const merged = [...(form.images || []), ...files].slice(0, 10)
    setForm(prev => ({ ...prev, images: merged }))
  }

  const onVideosChange = (e) => {
    const files = Array.from(e.target.files || [])
    const merged = [...(form.videos || []), ...files].slice(0, 5)
    setForm(prev => ({ ...prev, videos: merged }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    dispatch(showLoading({ message: 'Saving changes…' }))
    try {
      await dispatch(updateProduct({ id, values: form })).unwrap()
      navigate('/vendor/products')
    } catch (_) {
      // error is reflected via updateError
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    dispatch(showLoading({ message: 'Deleting product…' }))
    try {
      await dispatch(deleteProduct(id)).unwrap()
      navigate('/vendor/products')
    } catch (_) {
      // error reflected via deleteError
    } finally {
      dispatch(hideLoading())
    }
  }

  if (currentLoading) {
    return (
      <section className={s.container}>
        <div className={s.wrap}><div className={s.small}>Loading product…</div></div>
      </section>
    )
  }

  if (currentError) {
    return (
      <section className={s.container}>
        <div className={s.wrap}><div className={s.error}>{currentError}</div></div>
      </section>
    )
  }

  if (!current) return null

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <h1 className={s.title}>Edit Product</h1>
        <div className={s.card}>
          {(updateError || deleteError) && <div className={s.error}>{updateError || deleteError}</div>}
          <form onSubmit={handleSave}>
            <div className={s.gridTwo}>
              <div className={s.row}>
                <label className={s.label}>Name</label>
                <input className={s.input} value={form.name} onChange={(e)=>updateField('name', e.target.value)} />
              </div>
              <div className={s.row}>
                <label className={s.label}>Stock</label>
                <input className={s.input} type="number" min="0" value={form.stock} onChange={(e)=>updateField('stock', Number(e.target.value))} />
              </div>
            </div>

            <div className={s.row}>
              <label className={s.label}>Description</label>
              <textarea className={s.textarea} rows={4} value={form.description} onChange={(e)=>updateField('description', e.target.value)} />
            </div>

            <div className={s.gridTwo}>
              <div className={s.row}>
                <label className={s.label}>Category</label>
                <select className={s.select} value={form.category_id} onChange={(e)=>updateField('category_id', e.target.value)}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className={s.row}>
                <label className={s.label}>Subcategory</label>
                <select className={s.select} value={form.subcategory_id} onChange={(e)=>updateField('subcategory_id', e.target.value)}>
                  <option value="">Select subcategory</option>
                  {(subcategoriesMap[form.category_id] || []).map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                </select>
              </div>
            </div>

            <div className={s.card} style={{ border: 'none', padding: 0, marginTop: 10 }}>
              <div className={s.small}>Existing Media</div>
              <div className={s.mediaGrid}>
                {(current.images || []).map((img, idx) => (
                  <div className={s.thumb} key={`img-${idx}`}>
                    <img className={s.thumbImg} src={img.image_url || img.url || img} alt={`img-${idx}`} />
                  </div>
                ))}
                {(current.videos || []).map((vid, idx) => (
                  <div className={s.thumb} key={`vid-${idx}`}>
                    <video className={s.thumbImg} src={vid.video_url || vid.url || vid} controls />
                  </div>
                ))}
              </div>
            </div>

            <div className={s.row}>
              <label className={s.label}>Add Images (optional)</label>
              <div className={s.inlineRow}>
                <button type="button" className={`${s.pillBtn} ${s.pillBtnPrimary}`} onClick={() => imagesInputRef.current?.click()}>Choose Images</button>
                <div className={s.small}>Selected: {form.images?.length || 0}</div>
              </div>
              <input ref={imagesInputRef} className={s.hiddenFile} type="file" accept="image/*" multiple onChange={onImagesChange} />
            </div>

            <div className={s.row}>
              <label className={s.label}>Add Videos (optional)</label>
              <div className={s.inlineRow}>
                <button type="button" className={`${s.pillBtn} ${s.pillBtnPrimary}`} onClick={() => videosInputRef.current?.click()}>Choose Videos</button>
                <div className={s.small}>Selected: {form.videos?.length || 0}</div>
              </div>
              <input ref={videosInputRef} className={s.hiddenFile} type="file" accept="video/*" multiple onChange={onVideosChange} />
            </div>

            <div className={s.card} style={{ border: 'none', padding: 0, marginTop: 10 }}>
              <div className={s.small}>Specifications</div>
              {form.specs.map((sp, idx) => (
                <div key={idx} className={s.gridTwo}>
                  <div className={s.row}>
                    <input className={s.input} placeholder="Key" value={sp.key} onChange={(e)=>updateSpec(idx,'key',e.target.value)} />
                  </div>
                  <div className={s.row}>
                    <input className={s.input} placeholder="Value" value={sp.value} onChange={(e)=>updateSpec(idx,'value',e.target.value)} />
                  </div>
                </div>
              ))}
              <div className={s.mt4}>
                <button type="button" className={s.pillBtn} onClick={addSpec}>Add Spec</button>
              </div>
            </div>

            <div className={s.actions}>
              <button className={`button ${updating ? 'buttonGhost' : 'buttonPrimary'}`} type="submit" disabled={updating}>Save Changes</button>
              <button type="button" className="button buttonGhost" onClick={()=>navigate('/vendor/products')}>Cancel</button>
              <button type="button" className="button" onClick={handleDelete} disabled={deleting}>Delete</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
