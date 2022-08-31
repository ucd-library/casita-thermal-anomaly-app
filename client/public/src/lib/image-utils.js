import config from '../config.js';

class ImageUtils {

  constructor() {
    
  }

  getProductUrlsFromEvent(event) {
    let products = {};
    config.image.products.forEach(product => {
      let priorHour = new Date(new Date(event.created).getTime() - (1000 * 60 * 60 *2));
      let hour = priorHour.getUTCHours()+'';
      if( hour.length === 1 ) hour = '0'+hour; 

      products[product] = `${config.dataHost}/west/thermal-anomaly/${priorHour.toISOString().split('T')[0]}/${hour}/00-00/${event.band}/${event.apid}/blocks/${config.image.block.x}-${config.image.block.y}/${product}`;
    })
    return products;
  }

}

const instance = new ImageUtils();
export default instance;