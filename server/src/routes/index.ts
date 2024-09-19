import authRoutes from './auth.routes'
import docRoutes from './doc.routes'

import orderRoutes from './order.routes'
import productRoutes from './product.routes'

export const apiRoutes = [ orderRoutes,productRoutes ]
export const publicRoutes = [ authRoutes, docRoutes ]

export default apiRoutes
