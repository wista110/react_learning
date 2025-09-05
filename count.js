//React v19.0.0
const version = '19.0.0'; // Reactのバージョンを定数として定義

//カウンター変数
let counter = 0; // クリック回数を記録するグローバル変数を初期化

//mobuleをインポートする
async function init() { // 非同期でReactモジュールを初期化する関数
    const module1 = await import(`https://esm.sh/react@${version}`); // CDNからReactライブラリを動的インポート
    window.React = module1.default; // インポートしたReactをグローバル変数として設定
    const module2 = await import(`https://esm.sh/react-dom@${version}/client`); // CDNからReactDOMライブラリを動的インポート
    window.ReactDOM = module2.default; // インポートしたReactDOMをグローバル変数として設定

    const root = document.getElementById('root'); // HTMLから'root'というIDの要素を取得
    root.addEventListener('click', doCount); // root要素にクリックイベントリスナーを追加（クリック時にdoCount関数を実行）
    window.rootElement = ReactDOM.createRoot(root); // Reactのルートエレメントを作成してグローバル変数に保存
    doCount(); // 初回表示のためにdoCount関数を実行
}

//clickイベント処理
function doCount() { // クリック時に実行される関数
    counter++; // カウンター変数を1増加
    let element = React.createElement('p',{},"count:" + counter) // <p>タグのReact要素を作成（props無し、テキストは"count:数値"）
    rootElement.render(element); // 作成した要素をDOMに描画
}

//初期化の実行
init(); // アプリケーション開始時にinit関数を呼び出し