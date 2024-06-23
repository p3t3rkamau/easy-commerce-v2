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
  const isAttributesCollection = (
    attribute: string | AttributesCollection,
  ): attribute is AttributesCollection => {
    return (attribute as AttributesCollection).Attribute_Name !== undefined
  }

  return (
    <div>
      {ProductsAttributes &&
        ProductsAttributes.map((attribute, index) =>
          isAttributesCollection(attribute) ? (
            <div key={index} className={classes.attributeSelect}>
              {attribute.Attribute_Property?.some(property => property.type === 'color') ? (
                <div className={classes.colorOptions}>
                  <div className={classes.attributeTitle}>{`Select ${attribute.title}`}</div>
                  {attribute.Attribute_Property?.map((property, idx) =>
                    property.type === 'color' ? (
                      <div
                        key={idx}
                        className={`${classes.colorOption} ${
                          selectedAttributes[attribute.Attribute_Name] === property.Value
                            ? classes.selected
                            : ''
                        }`}
                        style={{ backgroundColor: property.colourValue }}
                        onClick={() =>
                          handleAttributeSelect(attribute.Attribute_Name, property.Value)
                        }
                      ></div>
                    ) : null,)}
                </div>
              ) : (
                <div>
                  <label
                    htmlFor={`attribute-${attribute.Attribute_Name}`}
                  >{`Select ${attribute.title}`}</label>
                  <select
                    id={`attribute-${attribute.Attribute_Name}`}
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
                </div>
              )}
            </div>
          ) : null,)}
    </div>
  )
}

export default AttributeSelector
