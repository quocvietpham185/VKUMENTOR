window.onload = function () {
    google.accounts.id.initialize({
      client_id: '800311714334-mnv3q6hkgplp7dceusboie62mv8rg7nt.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
  
    // google.accounts.id.renderButton(
    //   document.getElementById('google-signin-button'),
    //   { theme: 'outline', size: 'large' }
    // );
  
    google.accounts.id.prompt(); // Display the One Tap dialog
  };
  
  function handleCredentialResponse(response) {
    // Gửi token tới server của bạn để xử lý đăng nhập
    axios.post('http://127.0.0.1:8000/api/auth/google', {
      token: response.credential
    })
    .then(function (response) {
      // Lưu JWT token và điều hướng tới trang dashboard
      localStorage.setItem('token', response.data.token);
      // window.location.href = './index.html';
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
  }
  