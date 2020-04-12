const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');

const componentTemplatePath = path.join(__dirname, 'templates', 'component.template');
const indexTemplatePath = path.join(__dirname, 'templates', 'index.template');

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'create-react-component.createComponent',
    async function (uri) {
      const componentName = await vscode.window.showInputBox({ prompt: 'Component name' });

      if (!componentName) {
        return;
      }

      const parentFolder = uri ? uri.fsPath : vscode.workspace.rootPath;
      const componentFolder = path.join(parentFolder, componentName);

      try {
        await fs.mkdir(componentFolder);

        const [componentTemplate, indexTemplate] = await Promise.all([
          fs.readFile(componentTemplatePath),
          fs.readFile(indexTemplatePath),
        ]);

        const component = componentTemplate.toString().replace(/{componentName}/g, componentName);
        const index = indexTemplate.toString().replace(/{componentName}/g, componentName);

        await fs.writeFile(path.join(componentFolder, `${componentName}.js`), component);
        await fs.writeFile(path.join(componentFolder, `index.js`), index);
      } catch (error) {
        console.error(error);
      }
    },
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
