// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import banner from './banner'
import product from './product'
import save from './save'
import user from './user'
import products from './products'
import postedBy from './postedBy'
import checkout from './checkout'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
  banner,product,save,user,products,postedBy,checkout
  ]),
})
