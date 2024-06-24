import React from 'react'

import { AttributesCollection } from '../../../../payload/payload-types'

import classes from './index.module.scss'

interface AttributeSelectorProps {
  ProductsAttributes: AttributesCollection[]
  selectedAttributes: { [key: string]: string }
  handleAttributeSelect: (attributeName: string, value: string) => void
}

export const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  ProductsAttributes,
  selectedAttributes,
  handleAttributeSelect,
}) => {
  return (
    <div>
      {ProductsAttributes &&
        ProductsAttributes.map((attribute, index) => (
          <div key={index} className={classes.attributeSelect}>
            <div className={classes.attributeTitle}>{`Select`}</div>
            {attribute.Attribute_Property?.some(property => property.type === 'color') ? (
              <div className={classes.colorOptions}>
                {attribute.Attribute_Property?.map((property, idx) =>
                  property.type === 'color' ? (
                    <div
                      key={idx}
                      className={`${classes.colorOption} ${
                        selectedAttributes[attribute.Attribute_Name] === property.colourValue
                          ? classes.selected
                          : ''
                      }`}
                      style={{ backgroundColor: property.colourValue }}
                      onClick={() => {
                        // console.log(`Selecting color: ${property.colourValue}`)

                        handleAttributeSelect(attribute.Attribute_Name, property.colourValue)
                      }}
                    ></div>
                  ) : null,
                )}
              </div>
            ) : (
              <select
                onChange={e => handleAttributeSelect(attribute.Attribute_Name, e.target.value)}
                value={selectedAttributes[attribute.Attribute_Name] || ''}
                className={classes.select}
              >
                <option value="">{`Select ${attribute.title}`}</option>
                {attribute.Attribute_Property?.map((property, idx) => (
                  <option key={idx} value={property.Value}>
                    {property.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
    </div>
  )
}

export default AttributeSelector
