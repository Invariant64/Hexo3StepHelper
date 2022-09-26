const vscode = require('vscode');
//const fs = require('fs');

function activate(context) {
    console.log('Thanks for using Hexo3StepHelper!');

    let commandOfUpdateBlog = vscode.commands.registerCommand('updateBlog', () => {
        const workFolders = vscode.workspace.workspaceFolders;
        if (workFolders.length > 1) {
            vscode.window.showInformationMessage('当前窗口存在多个工作区，请关闭多余的工作区，只留下博客文件夹，然后再试一次。');
            return;
        }
        const filePath = workFolders[0].uri.fsPath;
        //vscode.window.showInformationMessage(`Your Blog Path is ${filePath}, Start to Update!`);

        const terminal = vscode.window.createTerminal('updateblog');
        terminal.show();
        terminal.sendText(`cd ${filePath}`);
        terminal.sendText('hexo clean');
        terminal.sendText('hexo g');
        terminal.sendText('hexo d');
        terminal.sendText('exit');

        vscode.window.onDidCloseTerminal((t) => {
            if (t.name == 'updateblog') {
                vscode.window.showInformationMessage('Complete Updating Your Blog!');
            }
        });
    });

    let commandOfLocalDebug = vscode.commands.registerCommand('localDebug', () => {
        const terminal = vscode.window.createTerminal('localdebug');

        const workFolders = vscode.workspace.workspaceFolders;
        if (workFolders.length > 1) {
            vscode.window.showInformationMessage('当前窗口存在多个工作区，请关闭多余的工作区，只留下博客文件夹，然后再试一次。');
            return;
        }
        terminal.sendText('hexo s');
        const openWebTerminal = vscode.window.createTerminal('openweb');
        openWebTerminal.sendText('start http://localhost:4000');
        openWebTerminal.sendText('exit');
        terminal.show();
    });

    // 将命令放入其上下文对象中，使其生效
    context.subscriptions.push(commandOfLocalDebug);
    context.subscriptions.push(commandOfUpdateBlog);
}


function deactivate() {}

module.exports = {
    activate,
    deactivate
}