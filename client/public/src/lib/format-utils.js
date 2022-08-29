class FormatUtils {
  /**
   * @method _formatDate
   * @description format datetime string
   *
   * @param {string} datetime
   * @param {boolean} abbreviated
   */
  formatDate(datetime, abbreviated) {
    const date = new Date(datetime);
    let formatted = '';
    if (abbreviated) {
        formatted = `${date.getMonth() + 1}/${date.getDate()}@${datetime.split('T')[1].split(':')[0]}`; // MM/DD@HH
    } else {
        formatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${datetime.split('T')[1].split('.')[0]}`; // MM/DD/YYYY HH:MM:SS
    }
    return formatted;
  }
}

export default new FormatUtils();