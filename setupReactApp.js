const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Replace `my-app` with your project name
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

// Step 1: Create the React app
exec(`npx create-react-app ${projectName}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating React app: ${error.message}`);
    return;
  }
  console.log(stdout);

  // Step 2: Change to the project directory
  const projectPath = path.join(process.cwd(), projectName);
  process.chdir(projectPath);

  // Step 3: Install Tailwind CSS and required packages
  exec('npm install -D tailwindcss', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing Tailwind CSS: ${error.message}`);
      return;
    }
    console.log(stdout);

    // Step 4: Initialize Tailwind CSS configuration
    exec('npx tailwindcss init', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error initializing Tailwind CSS: ${error.message}`);
        return;
      }
      console.log(stdout);

      // Step 5: Configure Tailwind CSS
      const tailwindConfig = `module.exports = {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
          extend: {},
        ],
        plugins: [],
      };`;

      fs.writeFileSync('tailwind.config.js', tailwindConfig, 'utf8');

      // Step 6: Add Tailwind directives to the CSS file
      const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

      fs.writeFileSync(path.join('src', 'index.css'), cssContent, 'utf8');

      console.log('Tailwind CSS has been configured successfully.');

      // Step 7: Install react-router-dom
      exec('npm install react-router-dom@latest', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing React Router DOM: ${error.message}`);
          return;
        }
        console.log(stdout);
      });
    });
  });
});
