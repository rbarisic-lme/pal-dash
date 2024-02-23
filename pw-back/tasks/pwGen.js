// Create a hashed password
import bcrypt from 'bcryptjs';

const args = process.argv.slice(2);

bcrypt.hash(args[0], 10).then(hashedPassword => {
  const hashedPasswordShellSafe = hashedPassword.replace(/\$/g, '\\$');

  console.log('Your hashed password:');
  console.log(hashedPasswordShellSafe);
})
