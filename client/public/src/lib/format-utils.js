class FormatUtils {
  /**
   * @method _formatDate
   * @description format datetime string
   *
   * @param {string} datetime
   * @param {boolean} abbreviated
   */
  formatDate(datetime, abbreviated) {
    if( typeof datetime === 'string' ) {
      datetime = new Date(datetime);
    }

    let formatted = '';
    if (abbreviated) {
        formatted = `${datetime.getMonth() + 1}/${datetime.getDate()}@${this.padLeft(datetime.getHours())}`; // MM/DD@HH
    } else {
        formatted = `${datetime.getMonth() + 1}/${datetime.getDate()}/${datetime.getFullYear()} ${this.padLeft(datetime.getHours())}`; // MM/DD/YYYY HH:MM:SS
    }
    return formatted;
  }

  padLeft(val, count=2) {
    val = val+'';
    while( val.length < count ) val = '0'+val;
    return val;
  }
}

export default new FormatUtils();