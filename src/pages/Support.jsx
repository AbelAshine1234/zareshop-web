import React, { useState } from 'react'
import s from './Support.module.scss'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../features/ui/loadingSlice'

export default function Support() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setInfo(''); setError('')
    if (!name || !message) { setError('Please provide your name and a message.'); return }
    try {
      dispatch(showLoading({ message: 'Sending your message…' }))
      // Mock async send; integrate with your API or email provider here
      await new Promise(res => setTimeout(res, 1200))
      setInfo('Thanks! Your message has been sent to our admins.')
      setName(''); setEmail(''); setPhone(''); setMessage('')
    } catch (e) {
      setError('Failed to send message. Please try again later.')
    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <section className={s.wrap}>
      <div className={s.header}>
        <div className={s.title}>Contact Support</div>
        <div className={s.subtitle}>Reach us by email or phone, or send a direct message to the admin from here.</div>
      </div>

      <div className={s.grid}>
        <div className={s.card}>
          <form onSubmit={onSubmit}>
            <div className={s.row}>
              <div>
                <div className={s.label}>Your Name</div>
                <input className={s.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Abel Ashine" />
              </div>
              <div>
                <div className={s.label}>Email</div>
                <input className={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
            </div>
            <div className={s.row}>
              <div>
                <div className={s.label}>Phone</div>
                <input className={s.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251 9XX XXX XXX" />
              </div>
            </div>
            <div>
              <div className={s.label}>Message</div>
              <textarea className={s.textarea} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" />
            </div>
            {info && <div className={s.info} style={{ marginTop: 8 }}>{info}</div>}
            {error && <div className={s.error} style={{ marginTop: 8 }}>{error}</div>}
            <div className={s.actions}>
              <button className={s.btn} type="button" onClick={() => { setName(''); setEmail(''); setPhone(''); setMessage(''); setError(''); setInfo('') }}>Clear</button>
              <button className={`${s.btn} ${s.btnPrimary}`} type="submit">Send Message</button>
            </div>
          </form>
        </div>

        <div className={s.contacts}>
          <div className={s.contactItem}>
            <div className={s.contactTitle}>Email</div>
            <div>support@zareshop.et</div>
            <div>admin@zareshop.et</div>
          </div>
          <div className={s.contactItem}>
            <div className={s.contactTitle}>Phone</div>
            <div>+251 911 000 000</div>
            <div>+251 922 111 111</div>
          </div>
        </div>
      </div>
    </section>
  )
}
