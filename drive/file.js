function onChange(event) {
  // 複数選択したファイルをFileList型オブジェクトとして取得
  let files = event.target.files;
  for (let file of files) {
    console.log(file.name); // [object file]...
  }
}
document.getElementById("file").addEventListener('change', onChange, false);
