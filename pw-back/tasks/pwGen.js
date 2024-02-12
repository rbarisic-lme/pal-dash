// Create a hashed password
import bcrypt from 'bcrypt';

const args = process.argv.slice(2);

const hashedPassword = await bcrypt.hash(args[0], 10);

console.log('Your hashed password:');
console.log(hashedPassword);