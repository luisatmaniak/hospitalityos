import * as Bottle from 'bottlejs'
import { API_URL } from '../core/services/catalog'

Bottle.config.strict = true

/**
 * Common DI container for client and server
 * @return {Bottle}
 */
const createDiContainer = () => {
  const container = new Bottle()

  container.constant(API_URL, process.env.API_URL || 'http://hospitalityos.test:8080/wp-json')

  return container
}

export default createDiContainer
