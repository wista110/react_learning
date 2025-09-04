//React v19.0.0
const version = '19.0.0';

//moduleをインポート
async function init() {
    const module1 = await import('https://esm.sh/react@${version}');
    window.React = module1.default;
    const module2 = await import('https://esm.sh/react-dom@${version}/client');
    window.ReactDOM = module2.default;
    //メインプログラムの実行
    main();
}

//メインプログラム
function main(){
    const root = document.getElementById('root');
    const rootElement = ReactDOM.createRoot(root);
    const h2 = React.createElement('h2', {}, "Sample Application");
    const p = React.createElement('p', {}, "これはサンプルアプリケーションです");
    const div = React.createElement('div', {}, [h2, p]);
    rootElement.render(div);
}

//　初期化の実行
init();