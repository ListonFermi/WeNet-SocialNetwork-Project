export function generateStrongPassword() {
    const length = Math.floor(Math.random() * 5) + 8;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const specialChars = "@#$%^&*()_+~`|}{[]:;?><,./-=";
  
    let allChars = uppercase + lowercase + digits + specialChars;
  
    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  
    return password;
  }
  