import { createBrowserHistory } from 'history'

import { BASE_URL } from './utils/config'

export default createBrowserHistory({basename: BASE_URL})
