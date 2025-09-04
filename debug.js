//React v19.0.0
const version = '19.0.0';
console.log('1. バージョン設定:', version);

//moduleをインポート
async function init() {
    console.log('2. init()関数開始');
    
    console.log('3. React本体をインポート中...');
    const module1 = await import(`https://esm.sh/react@${version}`);
    window.React = module1.default;
    console.log('4. React本体インポート完了:', window.React);
    
    console.log('5. ReactDOMをインポート中...');
    const module2 = await import(`https://esm.sh/react-dom@${version}/client`);
    window.ReactDOM = module2.default;
    console.log('6. ReactDOMインポート完了:', window.ReactDOM);
    
    console.log('7. main()関数を呼び出し');
    main();
}

//メインプログラム
function main(){
    console.log('8. main()関数開始');
    
    const root = document.getElementById('root');
    console.log('9. root要素取得:', root);
    
    const rootElement = ReactDOM.createRoot(root);
    console.log('10. Reactルート作成:', rootElement);
    
    const h2 = React.createElement('h2', {}, "Sample Application");
    const p = React.createElement('p', {}, "これはサンプルアプリケーションです");
    const div = React.createElement('div', {}, [h2, p]);
    console.log('11. React要素作成:', div);
    
    console.log('12. レンダリング実行');
    rootElement.render(div);
    console.log('13. レンダリング完了');
}

console.log('0. スクリプト読み込み開始');
init();