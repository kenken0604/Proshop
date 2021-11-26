import React from 'react'
import { Helmet } from 'react-helmet'

const MetaHelmet = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

MetaHelmet.defaultProps = {
  title: 'Welcome to Proshop | Home',
  description: 'We sell the best for the cheapest',
  keywords: 'eletronics, home tech, quality garantee',
}

export default MetaHelmet
