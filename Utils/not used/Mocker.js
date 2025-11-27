export default class Mocker{
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomWord(length){
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }

    static millisecondsToHMS(milliseconds) {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const durationInHourMinsSec = `${hours}h${minutes}m${seconds}s`
        return durationInHourMinsSec;
      }

    static async getCurrentDate() {
        // Create a new Date object
        const currentDate = new Date();
      
        // Get the individual components of the date
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        const day = currentDate.getDate();
      
        // Format the date as a string (you can customize the format as needed)
        const formattedDate = `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year}`
        return formattedDate;
      }

    static getDate(days){
      const dateNow = new Date();
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return new Date(dateNow.setDate(dateNow.getDate() + days)).toLocaleDateString('en-US',options); 
    }

}