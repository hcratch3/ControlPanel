import upload from "./upload.mjs";
import config from "./config.mjs";
import signin from "./signin.mjs";

async function onChange(event) {
  const files = event.target.files;
  const folder = document.getElementById("folderInput").value || 'default-folder'; // フォルダー名が空ならデフォルトのフォルダーを使用
  const progressBar = document.getElementById("progressBar");
  const status = document.getElementById("status");

  progressBar.style.display = "block";
  progressBar.value = 0;
  status.textContent = "";

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
    console.log(file.name);

    const fileContent = await readFile(file);
    console.log(fileContent);

    const blob = new Blob([fileContent], { type: file.type });

    // アップロードするファイルを選択したフォルダーに送信
    const response = await upload(accessToken, `${folder}/${file.name}`, blob);

    if (200 <= response.status && response.status < 300) {
      console.log(`${file.name}のアップロードが完了しました`);
    }

    progressBar.value = ((i + 1) / files.length) * 100;
    status.textContent = `処理中: ${i + 1}/${files.length} ファイル完了`;
  }

  status.textContent = "すべてのファイルが処理されました！";
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
      resolve(event.target.result);
    };

    fileReader.onerror = function(event) {
      reject(new Error("ファイルの読み込み中にエラーが発生しました。"));
    };

    fileReader.readAsText(file);
  });
}

document.getElementById("file").addEventListener('change', onChange, false);

function main() {
  const buttonUpload = document.querySelector('#buttonUpload');

  buttonUpload.addEventListener('click', async (event) => {
    event.preventDefault();

    const {hash} = window.location;
    const pattern = /^#access_token=/;

    if (!pattern.test(hash)) {
      alert("ログインが必要です。サインインを行ってください。");
      signin(config);
    } else {
      document.getElementById("file").click(); // ファイル選択をトリガー
    }
  });
}

main();
