import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import s from './VendorAnalytics.module.scss'
import { fetchMyProducts } from '../../features/products/vendorProductsSlice'

export default function VendorProducts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, loading, error, pagination } = useSelector(s2 => s2.vendorProducts)

  useEffect(() => {
    dispatch(fetchMyProducts({ page: 1, limit: 10 }))
  }, [dispatch])

  return (
    <section className={s.container}>
      <div className={s.wrap}>
        <div className={s.pageHeader}>
          <div className={s.left}>
            <button className={s.backBtn} onClick={() => navigate('/vendor')}>
              <span>←</span><span>Back</span>
            </button>
            <div className={s.pageTitle}>Products</div>
          </div>
          <div className={s.actions}>
            <Link className={`${s.btn} ${s.btnPrimary}`} to="/vendor/products/new">Add Product</Link>
          </div>
        </div>
        <div className={s.card}>
          {loading && <div className={s.small}>Loading products...</div>}
          {error && <div className={`${s.small} ${s.error}`}>{error}</div>}
          {!loading && !error && (
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr className={s.theadRow}>
                    <th className={s.th}>ID</th>
                    <th className={s.th}>Name</th>
                    <th className={s.th}>Category</th>
                    <th className={s.th}>Stock</th>
                    <th className={s.th}>Images</th>
                    <th className={s.th}>Videos</th>
                    <th className={s.th}>Created</th>
                    <th className={s.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(p => (
                    <tr key={p.id} className={s.tbodyRow}>
                      <td className={s.td}>{p.id}</td>
                      <td className={s.td}>{p.name}</td>
                      <td className={s.td}>{p.category?.name || '-'}</td>
                      <td className={s.td}>{p.stock}</td>
                      <td className={s.td}><span className={s.badge}>🖼 {Array.isArray(p.images) ? p.images.length : 0}</span></td>
                      <td className={s.td}><span className={s.badge}>🎬 {Array.isArray(p.videos) ? p.videos.length : 0}</span></td>
                      <td className={s.td}>{p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}</td>
                      <td className={s.td}>
                        <Link className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} to={`/vendor/products/${p.id}`}>Manage</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={`${s.small} ${s.mt8}`}>Page {pagination.page} of {pagination.pages} • Total {pagination.total}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
