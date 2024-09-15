import { render, screen } from '@testing-library/react'

import Header from '../../../_components/Header'

test('renders the Header', () => {
  const { container } = render(<Header />)
  console.log(container.innerHTML) // This will log the entire HTML structure of the rendered Header
})
