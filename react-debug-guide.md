# Reactアプリケーション デバッグガイド

## 概要
Reactアプリケーションの処理の流れを確認・デバッグする方法をまとめたガイドです。

## 1. console.log()を使ったデバッグ

### 基本的な使い方
各処理ステップにconsole.log()を挿入して、実行順序と値を確認します。

```javascript
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
```

## 2. ブラウザ開発者ツールでの確認方法

### Consoleタブ
- **アクセス方法**: F12 → Console
- **用途**: console.log()の出力、エラーメッセージの確認
- **操作**: 
  - Clear console（🗑️）でログをクリア
  - Filterでログをフィルタリング

### Sourcesタブ
- **アクセス方法**: F12 → Sources
- **用途**: ソースコードの確認、ブレークポイント設定
- **操作**:
  - 行番号クリックでブレークポイント設定
  - ステップ実行（F10: 次の行、F11: 関数内部へ）
  - 変数の値をホバーで確認

### Elementsタブ
- **アクセス方法**: F12 → Elements
- **用途**: DOM構造の確認、リアルタイム変化の観察
- **操作**:
  - `<div id="root">` を展開してReact要素の確認
  - 右クリック → Hide elementで要素を一時非表示

### Networkタブ
- **アクセス方法**: F12 → Network
- **用途**: ライブラリの読み込み状況確認
- **操作**:
  - ページ更新してリクエストを記録
  - `esm.sh`からのファイル取得状況を確認

## 3. ステップバイステップデバッグ

### debugger文の使用
```javascript
async function init() {
    debugger;  // ここで処理が一時停止
    const module1 = await import(`https://esm.sh/react@${version}`);
    debugger;  // インポート後に停止
    // ...
}
```

### ブレークポイントの設定
1. **F12** → **Sources**
2. ファイルを選択（main.js）
3. 行番号をクリックしてブレークポイント設定
4. ページを更新して実行

## 4. 処理の流れ確認

### 実行順序



### DOM変化の確認
**実行前:**
```html
<div id="root"></div>
```

**実行後:**
```html
<div id="root">
    <div>
        <h2>Sample Application</h2>
        <p>これはサンプルアプリケーションです</p>
    </div>
</div>
```

## 5. よくある問題とデバッグ方法

### 問題1: ライブラリが読み込めない
**症状**: `Module not found` エラー
**確認方法**: 
- Networkタブで404エラーを確認
- Consoleでインポートエラーを確認

### 問題2: DOM要素が見つからない
**症状**: `getElementById returns null`
**確認方法**:
- Elementsタブで`id="root"`の存在確認
- console.log()でroot変数の値を確認

### 問題3: CSPエラー
**症状**: `Content Security Policy` エラー
**確認方法**:
- Consoleでセキュリティエラーを確認
- HTMLにCSPメタタグを追加

### 問題4: レンダリングされない
**症状**: "wait..."が変わらない
**確認方法**:
- console.log()で各ステップの実行を確認
- React要素の構造をログ出力

## 6. 実践的なデバッグ手順

1. **Console**でエラーメッセージを確認
2. **console.log()**を追加して実行順序を確認
3. **Sources**でブレークポイントを設定
4. **Elements**でDOM変化を観察
5. **Network**でライブラリ読み込みを確認

## 7. デバッグのベストプラクティス

- **段階的にログを追加**: 一度にすべてではなく、問題箇所を絞り込む
- **意味のあるメッセージ**: `console.log('ここ')` ではなく `console.log('React要素作成完了:', element)`
- **オブジェクトの中身も確認**: `console.log('root:', root, 'type:', typeof root)`
- **エラー処理の追加**: try-catch文でエラーをキャッチ

```javascript
async function init() {
    try {
        const module1 = await import(`https://esm.sh/react@${version}`);
        console.log('React読み込み成功');
    } catch (error) {
        console.error('React読み込みエラー:', error);
    }
}
```

このガイドを参考に、Reactアプリケーションの動作を詳細に追跡できるようになります。