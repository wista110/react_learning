//React v19.0.0
const version = '19.0.0';

//moduleをインポート
function init() {
    import('https://esm.sh/react@${version}').then(React => {
        window.React = React;
        import('https://esm.sh/react-dom@${version}/client').then(ReactDOM => {
            window.ReactDOM = ReactDOM;
            main();
        });
    });
}

//メインプログラム
function main(){
    const root = document.getElementById('root');
    const rootElement = ReactDOM.createRoot(root);
    const h2 = React.createElement('h2', {
        id: 'title',
        name: 'title',
        style: {
            color: "white",
            backgroundColor: "blue",
            padding: "5px 10px",
        }
    }, "Sample Application");
    const p = React.createElement('p', {
        id: "msg",
        name: "msg",
        style:{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "16px",
        }
    }, "これはサンプルアプリケーションです");
    const div = React.createElement('div', {
        id: "elements",
        name: "elements",
        style: { 
            backgroundColor: "White",
            padding: "10px 0px 10px 0px"
        }
    }, [h2, p]);
    rootElement.render(div);
}

//　初期化の実行
init();