async function onChange(event) {
  // 複数選択したファイルをFileList型オブジェクトとして取得
  let files = event.target.files;

  for (let file of files) {
    console.log(file.name); // ファイル名を出力

    const fileContent = await readFile(file);
    console.log(fileContent); // ファイルの内容を出力
  }
}

// ファイルをテキストとして読み込む関数
function readFile(file) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();

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
