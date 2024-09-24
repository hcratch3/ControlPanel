function onChange(event) {
  // 複数選択したファイルをFileList型オブジェクトとして取得
  let files = event.target.files;
  for (let file of files) {
    console.log(file.name); // ファイル名を出力

    let fileReader = new FileReader();

    // ファイルの読み込みが完了したときの処理
    fileReader.onload = function(event) {
      console.log(event.target.result); // ファイルの内容を出力
    };

    // ファイルをテキストとして読み込む
    fileReader.readAsText(file);
  }
}

document.getElementById("file").addEventListener('change', onChange, false);
