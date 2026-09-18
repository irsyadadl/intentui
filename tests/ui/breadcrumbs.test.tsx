import { describe, it, expect } from 'vitest'
import { render, screen } from '../utils/render'
import { Breadcrumbs, BreadcrumbsItem } from '@/components/ui/breadcrumbs'

describe('Breadcrumbs', () => {
  it('marks the last item as current and keeps ancestor navigation', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem href="#home">Home</BreadcrumbsItem>
        <BreadcrumbsItem href="#docs">Docs</BreadcrumbsItem>
      </Breadcrumbs>
    )
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#home')
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
  })
})
