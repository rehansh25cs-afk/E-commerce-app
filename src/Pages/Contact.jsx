import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className='max-w-4xl mx-auto px-8 py-14'>

      {/* Page Heading */}
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>Contact Us</h1>
      <div className='w-12 h-1 bg-orange-400 mb-8 rounded'></div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-12'>

        {/* Left: Info */}
        <div className='flex flex-col gap-6'>
          <p className='text-gray-600 text-sm leading-relaxed'>
            This is a college project — but we'd still love to hear from you! If you have any
            feedback, suggestions, or just want to say hi, feel free to reach out.
          </p>

          <div className='flex flex-col gap-4'>
            <div className='flex items-start gap-3'>
              <span className='text-orange-400 mt-0.5'>📧</span>
              <div>
                <p className='text-sm font-medium text-gray-700'>Email</p>
                <p className='text-sm text-gray-500'>vibbixo@example.com</p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <span className='text-orange-400 mt-0.5'>🏫</span>
              <div>
                <p className='text-sm font-medium text-gray-700'>Institution</p>
                <p className='text-sm text-gray-500'>B.Tech / CS Department</p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <span className='text-orange-400 mt-0.5'>📍</span>
              <div>
                <p className='text-sm font-medium text-gray-700'>Location</p>
                <p className='text-sm text-gray-500'>India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          {submitted ? (
            <div className='bg-green-50 border border-green-200 rounded-xl p-6 text-center'>
              <p className='text-green-600 font-medium text-sm'>✅ Message sent successfully!</p>
              <p className='text-gray-500 text-xs mt-1'>Thanks for reaching out. We'll get back to you.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                className='mt-4 text-xs text-orange-400 underline cursor-pointer bg-transparent border-none'
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700' htmlFor='name'>Name</label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder='Your name'
                  required
                  className='border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors duration-200'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700' htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='your@email.com'
                  required
                  className='border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors duration-200'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700' htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder='Write your message here...'
                  required
                  rows={5}
                  className='border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors duration-200 resize-none'
                />
              </div>

              <button
                type='submit'
                className='bg-orange-400 text-white text-sm font-medium py-2.5 px-6 rounded-lg hover:bg-orange-500 transition-colors duration-200 cursor-pointer'
              >
                Send Message
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  )
}

export default Contact
