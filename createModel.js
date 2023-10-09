import fs from "fs";
import path from "path";

const args = process.argv.slice(2); // Slice to exclude the first two elements (node and script name)

const createSchema = () => {
  let name = "";
  if (args.length > 0) {
    name = args[0];
  } else {
    console.log(
      "Please enter a valid model name:\nExample: npm run createModel <modelName>"
    );
    return;
  }
  let modelName = name;
  let schemaName = name;
  if (name.charAt(name.length - 1) === "s") {
    schemaName = name.slice(0, name.length - 1);
  } else {
    modelName = name + "s";
  }
  modelName = `${modelName.charAt(0).toUpperCase()}${modelName.slice(1)}`;
  let mainPath = path.join(process.cwd(), "/models");
  const filename = path.join(process.cwd(), `/models/${name}Model.js`);
  if (!fs.existsSync(mainPath)) {
    fs.mkdirSync(mainPath);
  }

  // Create Model File
  const fileData = `import mongoose from 'mongoose';\n\nconst ${schemaName}Schema = new mongoose.Schema({});\n\nconst ${modelName} = mongoose.models.${modelName} || mongoose.model('${schemaName}', ${schemaName}Schema);\n\nexport default ${modelName};`;
  fs.writeFileSync(filename, fileData);
  console.log(`${name} model created successfully!`);
};

createSchema();
