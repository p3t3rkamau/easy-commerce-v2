import React from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

export default function BreadcrumbItemNextUi({ productname }) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Products</BreadcrumbItem>
      <BreadcrumbItem>{productname}</BreadcrumbItem>
    </Breadcrumbs>
  )
}
