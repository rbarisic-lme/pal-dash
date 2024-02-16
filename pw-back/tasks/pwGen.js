// Create a hashed password
import bcrypt from 'bcryptjs';

const args = process.argv.slice(2);

const hashedPassword = await bcrypt.hash(args[0], 10);

const hashedPasswordShellSafe = hashedPassword.replace(/\$/g, '\\$');

console.log('Your hashed password:');
console.log(hashedPasswordShellSafe);
