// class ValidationHelper {
//     static isValid(value) {
//         // ✅ Regex allows letters, digits, and common symbols
//         let onlyLetterRegex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/;
//         return onlyLetterRegex.test(value);
//     }
//     static isValidEmail(email) {
//         // ✅ Regex for validating email format
//         let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
//     static isValidPhoneNumber(phoneNumber) {
//     // ✅ Regex for validating Bangladesh phone numbers
//     let phoneRegex = /^(?:\+88)?01[3-9][0-9]{8}$/;
//     return phoneRegex.test(phoneNumber);
// }
//     static isValidPassword(password) {
//         // ✅ Regex for validating password strength
//         let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//         return passwordRegex.test(password);
//     }
//     static isValidUrl(url) {
//         // ✅ Regex for validating URL format
//         let urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- .\/?%&=]*)?$/;
//         return urlRegex.test(url);
//     }
//     static isValidDate(date) {
//         // ✅ Regex for validating date format (YYYY-MM-DD)
//         let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//         return dateRegex.test(date);
//     }
//     static IsNumber(valu){
//         let numberRegex = /^[+-]?\d+(\.\d+)?$/;
//         return numberRegex.test(valu);
//     }
//     static isEmpty(value) {
//         // ✅ Check if the value is empty or contains only whitespace
//         return value.length === 0 || value.trim().length === 0;
//     }
// }


// export default ValidationHelper;
export const isValidEmail=(email)=> {   
            // ✅ Regex for validating email format
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email)  }

