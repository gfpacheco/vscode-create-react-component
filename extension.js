const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');

const componentTemplatePath = path.join(__dirname, 'templates', 'component.template');
const nativeComponentTemplatePath = path.join(__dirname, 'templates', 'nativeComponent.template');
const indexTemplatePath = path.join(__dirname, 'templates', 'index.template');

function activate(context) {
  async function createComponent(uri, templatePath) {
    const componentName = await vscode.window.showInputBox({ prompt: 'Component name' });

    if (!componentName) {
      return;
    }

    const parentFolder = uri ? uri.fsPath : vscode.workspace.rootPath;
    const componentFolder = path.join(parentFolder, componentName);

    try {
      await fs.mkdir(componentFolder);

      const [componentTemplate, indexTemplate] = await Promise.all([
        fs.readFile(templatePath),
        fs.readFile(indexTemplatePath),
      ]);

      const component = componentTemplate.toString().replace(/{componentName}/g, componentName);
      const index = indexTemplate.toString().replace(/{componentName}/g, componentName);

      const componentPath = path.join(componentFolder, `${componentName}.js`);

      await fs.writeFile(componentPath, component);
      await fs.writeFile(path.join(componentFolder, `index.js`), index);

      const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(componentPath));

      vscode.window.showTextDocument(doc);
    } catch (error) {
      console.error(error);
    }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('create-react-component.createComponent', (uri) =>
      createComponent(uri, componentTemplatePath),
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('create-react-component.createNativeComponent', (uri) =>
      createComponent(uri, nativeComponentTemplatePath),
    ),
  );
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
