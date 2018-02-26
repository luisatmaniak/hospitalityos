import * as Bottle from 'bottlejs'
import { $userComponents, API_URL } from '../core/catalog'

Bottle.config.strict = true

/**
 * Common DI container for client and server
 * @return {Bottle}
 */
const createDiContainer = () => {
  const container = new Bottle()

  container.constant(API_URL, process.env.API_URL || 'http://hospitalityos.test:8080/wp-json')

  container.constant($userComponents, {
    button: () => import('../components/OsButton'),
    complex_component: () => import('../components/ComplexComponent'),
    slider: () => import('../components/AcfSlider'),
    custom_2_image_slider: () => import('../components/TwoImageSlider'),
  })

  return container
}

export default createDiContainer
