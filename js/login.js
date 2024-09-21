document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const userID = document.getElementById('userID').value;
  const errorElement = document.getElementById('error');

  fetch('./js/users.json')
    .then(response => response.json())
    .then(data => {
      const user = data.users.find(user => user.id === userID);

      if (user) {
        document.cookie = `username=${user.name}; path=/;`;
        window.location.href = '../dashboard.html';  // ダッシュボードにリダイレクト
      } else {
        errorElement.textContent = 'ユーザーIDが無効です。';
      }
    })
    .catch(error => {
      console.error('エラーが発生しました:', error);
      errorElement.textContent = 'ログイン中にエラーが発生しました。';
    });
});
