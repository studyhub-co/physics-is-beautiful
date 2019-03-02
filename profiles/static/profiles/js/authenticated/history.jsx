import { BASE_URL } from './utils/config'
import createHistory from 'history/createBrowserHistory'

export default createHistory({ basename: BASE_URL })
