import React from 'react'

const About = () => {
  return (
    <div className='max-w-4xl mx-auto px-8 py-14'>

      {/* Page Heading */}
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>About Us</h1>
      <div className='w-12 h-1 bg-orange-400 mb-8 rounded'></div>

      {/* Intro */}
      <p className='text-gray-600 text-base leading-relaxed mb-10'>
        Welcome to <span className='font-semibold text-orange-400'>Vibbixo</span> — a simple e-commerce web application
        built as part of a college web development project. This project was created to demonstrate the use of
        React.js, REST APIs, and modern frontend development practices.
      </p>

      {/* Project Details */}
      <div className='bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Project Overview</h2>
        <ul className='list-disc list-inside text-gray-600 text-sm space-y-2'>
          <li>Fetches real product data from the <span className='font-medium'>Platzi Fake Store API</span></li>
          <li>Displays products in a responsive grid layout</li>
          <li>Allows users to view detailed product information</li>
          <li>Built with React.js, Vite, and Tailwind CSS</li>
          <li>Uses React Router for client-side navigation</li>
          <li>Uses React Context API for global state management</li>
        </ul>
      </div>

      {/* Tech Stack */}
      <h2 className='text-xl font-semibold text-gray-700 mb-4'>Tech Stack</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10'>
        {[
          { name: 'React.js', desc: 'Frontend Library' },
          { name: 'Vite', desc: 'Build Tool' },
          { name: 'Tailwind CSS', desc: 'Styling' },
          { name: 'React Router', desc: 'Navigation' },
          { name: 'Context API', desc: 'State Management' },
          { name: 'Fetch API', desc: 'Data Fetching' },
        ].map((tech) => (
          <div key={tech.name} className='border border-gray-200 rounded-lg p-4 bg-white hover:border-orange-300 transition-colors duration-200'>
            <p className='font-semibold text-gray-700 text-sm'>{tech.name}</p>
            <p className='text-gray-400 text-xs mt-1'>{tech.desc}</p>
          </div>
        ))}
      </div>

      {/* Team / Purpose */}
      <div className='border-l-4 border-orange-400 pl-5 text-gray-600 text-sm leading-relaxed'>
        <p>
          This application was developed as a learning exercise to understand how modern React applications
          are structured, how to consume REST APIs, and how to handle routing and state in a real-world scenario.
          It is not intended for commercial use.
        </p>
      </div>

    </div>
  )
}

export default About
