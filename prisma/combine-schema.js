const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema.prisma');
const modelsDir = path.join(__dirname, 'models');

// Read the original schema content
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Remove existing model content
schemaContent = schemaContent.replace(/\/\/ MODEL_IMPORTS[\s\S]*$/, '// MODEL_IMPORTS');

const modelFiles = fs.readdirSync(modelsDir);

let modelContent = '\n'; // Start with a newline for better formatting
modelFiles.forEach(file => {
  if (file.endsWith('.prisma')) {
    let fileContent = fs.readFileSync(path.join(modelsDir, file), 'utf8');
    // Remove datasource block if present
    fileContent = fileContent.replace(/datasource db {[\s\S]*?}/gm, '');
    modelContent += fileContent + '\n';
  }
});

// Append new model content
schemaContent = schemaContent.replace('// MODEL_IMPORTS', '// MODEL_IMPORTS' + modelContent);

fs.writeFileSync(schemaPath, schemaContent);

console.log('Schema combined successfully!');