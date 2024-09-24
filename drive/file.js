function onChange(event) {
  // 複数選択したファイルをFileList型オブジェクトとして取得
  let files = event.target.files;
  for (let file of files) {
    console.log(file.name); // [object file]...
    let file_reader = new FileReader();

    // ファイルの読み込みを行ったら実行
    file_reader.addEventListener('load', function(e) {
      console.log(e.target.result);
    });

    file_reader.readAsText(file);
  }
}
document.getElementById("file").addEventListener('change', onChange, false);
