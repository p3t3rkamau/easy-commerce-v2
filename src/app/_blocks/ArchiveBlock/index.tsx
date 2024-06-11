import React from 'react'

import { CollectionArchive } from '../../_components/CollectionArchive'
import RichText from '../../_components/RichText'
import { ArchiveBlockProps } from './types'

import classes from './index.module.scss'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    // introContent,
    id,
    relationTo,
    populateBy,
    limit,
    populatedDocs,
    populatedDocsTotal,
    categories,
  } = props

  return (
    <div id={`block-${id}`} className={classes.archiveBlock}>
      <CollectionArchive
        populateBy={populateBy}
        relationTo={relationTo}
        populatedDocs={populatedDocs}
        populatedDocsTotal={populatedDocsTotal}
        categories={categories}
        limit={limit}
      />
    </div>
  )
}
