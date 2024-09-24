import signin from "./signin.mjs";
    import upload from "./upload.mjs";
    import config from "./config.mjs";

    async function onChange(event) {
      const files = event.target.files;
      const progressBar = document.getElementById("progressBar");
      const status = document.getElementById("status");

      progressBar.style.display = "block"; // プログレスバーを表示
      progressBar.value = 0; // 初期値を設定
      status.textContent = ""; // ステータスをリセット

      const {hash} = window.location;
      const pattern = /^#access_token=/;
      if (!pattern.test(hash)) {
        status.textContent = "アクセストークンが見つかりません";
        return;
      }

      const params = new URLSearchParams(hash.slice(1));
      const accessToken = params.get('access_token');

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file.name); // ファイル名を出力

        const fileContent = await readFile(file);
        console.log(fileContent); // ファイルの内容を出力

        const blob = new Blob([fileContent], { type: file.type });

        const response = await upload(accessToken, file.name, blob);
        if (200 <= response.status && response.status < 300) {
          console.log(`${file.name}のアップロードが完了しました`);
        }

        // プログレスバーを更新
        progressBar.value = ((i + 1) / files.length) * 100; 
        status.textContent = `処理中: ${i + 1}/${files.length} ファイル完了`;
      }

      status.textContent = "すべてのファイルが処理されました！";
    }

    // ファイルをテキストとして読み込む関数
    function readFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        // 読み込みが完了したときの処理
        fileReader.onload = function(event) {
          resolve(event.target.result); // 読み込んだ内容を返す
        };

        // 読み込みエラーの処理
        fileReader.onerror = function(event) {
          reject(new Error("ファイルの読み込み中にエラーが発生しました。"));
        };

        // ファイルをテキストとして読み込む
        fileReader.readAsText(file);
      });
    }

    document.getElementById("file").addEventListener('change', onChange, false);

    function main() {
      const buttonSignin = document.querySelector('#buttonSignin');
      const buttonUpload = document.querySelector('#buttonUpload');

      const onClickButtonSignin = (event) => {
        event.preventDefault();
        signin(config);
      };

      const onClickButtonUpload = (event) => {
        event.preventDefault();
        document.getElementById("file").click(); // ファイル選択をトリガー
      };

      buttonSignin.addEventListener('click', onClickButtonSignin);
      buttonUpload.addEventListener('click', onClickButtonUpload);
    }

    // Windowがロードされたらログイン画面を開く
    window.onload = function() {
      signin(config);
    };

    main();
