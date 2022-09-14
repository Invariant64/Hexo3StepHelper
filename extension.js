const vscode = require('vscode');
//const fs = require('fs');

function activate(context) {
    console.log('Thanks for using Hexo3StepHelper!');

    let commandOfUpdateBlog = vscode.commands.registerCommand('updateBlog', () => {
        const terminal = vscode.window.createTerminal();

        const workFolders = vscode.workspace.workspaceFolders;
        if (workFolders.length > 1) {
            vscode.window.showInformationMessage('当前窗口存在多个工作区，请关闭多余的工作区，只留下博客文件夹，然后再试一次。');
            return;
        }
        const filePath = workFolders[0].uri.fsPath;

        terminal.hide();
        vscode.window.showInformationMessage(`Your Blog Path is ${filePath}`);
        vscode.window.showInformationMessage('Start to Update!');

        terminal.sendText(`cd ${filePath}`);
        terminal.sendText('hexo clean');
        terminal.sendText('hexo g');
        terminal.sendText('hexo d');

        vscode.window.showInformationMessage('Complete Updating!');
    });

    // 将命令放入其上下文对象中，使其生效
    context.subscriptions.push(commandOfUpdateBlog);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}