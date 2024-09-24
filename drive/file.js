function onChange(event) {
  // 複数選択したファイルをFileList型オブジェクトとして取得
  let files = event.target.files;
  for (let file of files) {
    console.log(file.name); // [object file]...
  }
}
document.getElementById("file").addEventListener('change', onChange, false);

window.addEventListener('DOMContentLoaded', function(){

  // ファイルが選択されたら実行
  document.getElementById("file").addEventListener('change', function(e){

    let file_reader = new FileReader();

    // ファイルの読み込みを行ったら実行
    file_reader.addEventListener('load', function(e) {
      console.log(e.target.result);
                                    // FileReaderを使った
                                    // テキストファイルからの読み込みテスト
    });

    file_reader.readAsText(e.target.files[0]);
  });
});
