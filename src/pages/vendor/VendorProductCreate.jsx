import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import s from './VendorAnalytics.module.scss'
import pc from './VendorProductCreate.module.scss'
import { createProduct, clearCreateState } from '../../features/products/vendorProductsSlice'
import { showLoading, hideLoading } from '../../features/ui/loadingSlice'
import { fetchCategories, fetchSubcategories } from '../../features/categories/categoriesSlice'
import { fetchMe } from '../../features/auth/authSlice'
import CropModal from '../components/CropModal.jsx'

export default function VendorProductCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { creating, createError, lastCreated } = useSelector(s2 => s2.vendorProducts)

  const categories = useSelector((s2) => s2.categories?.categories) || []
  const subcategoriesMap = useSelector((s2) => s2.categories?.subcategories) || {}
  const me = useSelector((s2) => s2.auth?.user)

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
  const [imageList, setImageList] = useState([]) // Array<File>
  const [videoList, setVideoList] = useState([]) // Array<File>
  const [cropOpen, setCropOpen] = useState(false)
  const [cropIndex, setCropIndex] = useState(-1)
  const [cropFile, setCropFile] = useState(null)
  const imagesInputRef = useRef(null)
  const videosInputRef = useRef(null)

  useEffect(() => {
    // Load categories via Redux
    dispatch(fetchCategories())
    // Load current user via Redux to derive vendor_id
    dispatch(fetchMe())
  }, [dispatch])

  useEffect(() => {
    if (form.category_id) {
      dispatch(fetchSubcategories(form.category_id))
    }
  }, [form.category_id, dispatch])

  // Do not set vendor_id from client; backend should infer from auth token

  useEffect(() => {
    if (lastCreated) {
      // After successful creation, go back to list
      navigate('/vendor/products')
      dispatch(clearCreateState())
    }
  }, [lastCreated, navigate, dispatch])

  const updateField = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const updateSpec = (i, k, v) => setForm(prev => ({ ...prev, specs: prev.specs.map((s, idx) => idx === i ? { ...s, [k]: v } : s) }))
  const addSpec = () => setForm(prev => ({ ...prev, specs: [...prev.specs, { key: '', value: '' }] }))
  const removeSpec = (i) => setForm(prev => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }))

  // Build a FileList-like from array for thunk consumption
  const arrayToFileList = (files) => {
    // Some environments accept plain array; our thunk uses Array.from, so array is fine.
    return files
  }

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files || [])
    const merged = [...imageList, ...files].slice(0, 5) // limit 5
    setImageList(merged)
    setForm(prev => ({ ...prev, images: arrayToFileList(merged) }))
  }

  const onVideosChange = (e) => {
    const files = Array.from(e.target.files || [])
    const merged = [...videoList, ...files].slice(0, 2) // limit 2
    setVideoList(merged)
    setForm(prev => ({ ...prev, videos: arrayToFileList(merged) }))
  }

  const openCropAt = (idx) => {
    const f = imageList[idx]
    if (!f) return
    setCropIndex(idx)
    setCropFile(f)
    setCropOpen(true)
  }

  const applyCrop = (cropped) => {
    const next = imageList.slice()
    next[cropIndex] = cropped
    setImageList(next)
    setForm(prev => ({ ...prev, images: arrayToFileList(next) }))
    setCropOpen(false)
    setCropIndex(-1)
    setCropFile(null)
  }

  const cancelCrop = () => {
    setCropOpen(false)
    setCropIndex(-1)
    setCropFile(null)
  }

  const removeImage = (idx) => {
    const next = imageList.filter((_, i) => i !== idx)
    setImageList(next)
    setForm(prev => ({ ...prev, images: arrayToFileList(next) }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // Basic client-side checks (vendor_id is auto-filled if possible)
    if (!form.name || !form.category_id || !form.subcategory_id) return
    dispatch(showLoading({ message: 'Creating your product…' }))
    dispatch(createProduct(form)).finally(() => dispatch(hideLoading()))
  }

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h1 className={s.title}>Create Product</h1>
        </div>

        <div className={s.card}>
          {createError && <div className={`${s.small} ${pc.error}`}>{createError}</div>}
          <form onSubmit={onSubmit} className={s.form}>
            <div className={s.gridCards}>
              <div className={s.productCard}>
                <div className={s.sectionTitle}>Basics</div>
                <div className={s.row}>
                  <label className={s.label}>Name</label>
                  <input className={s.input} value={form.name} onChange={(e) => updateField('name', e.target.value)} />
                </div>
                <div className={s.row}>
                  <label className={s.label}>Description</label>
                  <textarea className={`${s.textarea}`} rows={4} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
                </div>
                <div className={s.checks}>
                  <label className={s.small}><input type="checkbox" checked={form.has_discount} onChange={(e) => updateField('has_discount', e.target.checked)} /> Has discount</label>
                  <label className={s.small}><input type="checkbox" checked={form.sold_in_bulk} onChange={(e) => updateField('sold_in_bulk', e.target.checked)} /> Sold in bulk</label>
                  <label className={s.small}><input type="checkbox" checked={form.used} onChange={(e) => updateField('used', e.target.checked)} /> Used</label>
                </div>
                <div className={s.row}>
                  <label className={s.label}>Stock</label>
                  <input className={s.input} type="number" min="0" value={form.stock} onChange={(e) => updateField('stock', Number(e.target.value))} />
                </div>
              </div>

              <div className={s.productCard}>
                <div className={s.sectionTitle}>Classification</div>
                <div className={s.gridTwo}>
                  <div className={s.row}>
                    <label className={s.label}>Category</label>
                    <select className={s.select} value={form.category_id} onChange={(e) => updateField('category_id', e.target.value)}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className={s.row}>
                    <label className={s.label}>Subcategory</label>
                    <select className={s.select} value={form.subcategory_id} onChange={(e) => updateField('subcategory_id', e.target.value)}>
                      <option value="">Select subcategory</option>
                      {(subcategoriesMap[form.category_id] || []).map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className={s.productCard}>
                <div className={s.sectionTitle}>Images (max 5)</div>
                <div className={s.row}>
                  <label className={s.label}>Up to 5 images • Max 10MB each • JPEG/PNG/WebP/GIF</label>
                  <div className={s.inlineRow}>
                    <button type="button" className={`${s.pillBtn} ${s.pillBtnPrimary}`} onClick={() => imagesInputRef.current?.click()}>Add Images</button>
                    <div className={s.hint}>Selected: {imageList.length}/5</div>
                  </div>
                  <input ref={imagesInputRef} className={s.hiddenFile} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={onImagesChange} />
                </div>
                {imageList.length > 0 && (
                  <div className={s.thumbs}>
                    {imageList.map((f, idx) => (
                      <div className={s.thumb} key={idx}>
                        <img className={s.thumbImg} alt={`img-${idx}`} src={URL.createObjectURL(f)} />
                        <div className={s.thumbActions}>
                          <button type="button" className={s.mini} onClick={() => openCropAt(idx)}>Crop</button>
                          <button type="button" className={`${s.mini} ${s.miniPrimary}`} onClick={() => removeImage(idx)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={s.productCard}>
                <div className={s.sectionTitle}>Videos (max 2)</div>
                <div className={s.row}>
                  <label className={s.label}>Up to 2 videos • Max 100MB each • MP4/AVI/MOV/WMV/FLV/WEBM</label>
                  <div className={s.inlineRow}>
                    <button type="button" className={`${s.pillBtn} ${s.pillBtnPrimary}`} onClick={() => videosInputRef.current?.click()}>Add Videos</button>
                    <div className={s.hint}>Selected: {videoList.length}/2</div>
                  </div>
                  <input ref={videosInputRef} className={s.hiddenFile} type="file" accept="video/mp4,video/avi,video/mov,video/wmv,video/x-flv,video/webm" multiple onChange={onVideosChange} />
                </div>
              </div>

              <div className={s.productCard}>
                <div className={s.sectionTitle}>Specifications</div>
                {form.specs.map((sp, idx) => (
                  <div key={idx} className={s.specRow}>
                    <input className={s.input} placeholder="Key" value={sp.key} onChange={(e) => updateSpec(idx, 'key', e.target.value)} />
                    <input className={s.input} placeholder="Value" value={sp.value} onChange={(e) => updateSpec(idx, 'value', e.target.value)} />
                    <button type="button" className={s.pillBtn} onClick={() => removeSpec(idx)}>Remove</button>
                  </div>
                ))}
                <button type="button" className={`${s.pillBtn} ${s.pillBtnPrimary}`} onClick={addSpec}>Add Spec</button>
              </div>
            </div>

            <div className={`${s.actions} ${s.mt4}`}>
              <button className={`button ${creating ? 'buttonGhost' : 'buttonPrimary'}`} type="submit" disabled={creating}>
                {creating ? 'Creating...' : 'Create Product'}
              </button>
              <button type="button" className="button buttonGhost" onClick={() => navigate('/vendor/products')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <CropModal open={cropOpen} file={cropFile} onCancel={cancelCrop} onApply={applyCrop} outSize={800} />
    </section>
  )
}
