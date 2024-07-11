// const btnLogin = document.getElementById("btnLogin");

// btnLogin.addEventListener("click", () => {
//   const txtUsername = document.getElementById("txtUsername");
//   const txtPassword = document.getElementById("txtPassword");

//   if (txtUsername.value.trim() === "" || txtPassword.value.trim() === "") {
//     alert("Bạn chưa nhập tài khoản hoặc mật khẩu")
//     return
//   }

//   axios
//     .post("http://127.0.0.1:8000/api/NguoiDung/login", {
//       "TenDangNhap": txtUsername.value,
//       "MatKhau": txtPassword.value,
//     })
//     .then((response) => {
//       if (response && response.data) {
        
//         if (response.data) {
//             localStorage.setItem("isLogin", true)
//             window.location.href = "./../../index.html"
//         }

//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

;(function () {
  return new Promise((resolve) => {
    if (window.axios) {
      return resolve(window.axios);
    }
    var d = document, jqr, ref = d.getElementsByTagName('body')[0];
    jqr = d.createElement('script');
    jqr.async = true;
    jqr.src = 'https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js';
    jqr.onload = function() {
      return resolve(window.axios);
    };
    ref.appendChild(jqr, ref);
  })
})()
document.querySelector("#btnLogin").addEventListener("click", function (e) {
  e.preventDefault();

  const login = document.getElementById('txtUsernameLogin').value;
  const password = document.getElementById('txtPasswordLogin').value;
  const errorField = document.getElementById('loginError');

  // Reset error field
  errorField.style.display = 'none';
  errorField.innerHTML = '';

  if (!login || !password) {
    errorField.innerHTML = '<div class="error-message">Vui lòng điền vào tất cả.</div>';
    errorField.style.display = 'block';
    return;
  }

  axios.post('http://localhost:8000/api/auth/login', {
      Login: login,
      MatKhau: password
  })
  .then((response) => {
      localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Lưu thông tin user vào localStorage
      window.location.href = './index.html'; // Chuyển hướng sau khi đăng nhập thành công
  })
  .catch((error) => {
      console.error('Login failed:', error); // Xử lý lỗi khi đăng nhập thất bại
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorField.innerHTML = '<div class="error-message">Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập của bạn.</div>';
            break;
          case 404:
            errorField.innerHTML = '<div class="error-message">Không tìm thấy người dùng. Vui lòng kiểm tra chi tiết đăng nhập của bạn.</div>';
            break;
          default:
            errorField.innerHTML = '<div class="error-message">Đã xảy ra lỗi. Vui lòng thử lại sau.</div>';
        }
      } else {
        errorField.innerHTML = '<div class="error-message">Đã xảy ra lỗi. Vui lòng kiểm tra kết nối của bạn.</div>';
      }
      errorField.style.display = 'block';
  });
});



// Tương tự cho phần đăng ký
document.querySelector("#btnRegister").addEventListener("click", function (e) {
  e.preventDefault();

  const login = document.getElementById('txtUsername').value;
  const password = document.getElementById('txtPassword').value;
  const confirmPassword = document.getElementById('txtConfirmPassword').value;
  const errorField = document.getElementById('registerError');

  // Reset error field
  errorField.style.display = 'none';
  errorField.innerHTML = '';

  if (!login || !password || !confirmPassword) {
    errorField.innerHTML = '<div class="error-message">Vui lòng điền vào tất cả.</div>';
    errorField.style.display = 'block';
    return;
  }

  if (password !== confirmPassword) {
    errorField.innerHTML = '<div class="error-message">Mật khẩu không hợp lệ.</div>';
    errorField.style.display = 'block';
    return;
  }

  axios.post('http://localhost:8000/api/auth/register', {
      Login: login,
      MatKhau: password
  })
  .then((response) => {
      alert('Registration successful!');
      window.location.href = './login.html'; // Chuyển hướng sau khi đăng ký thành công
  })
  .catch((error) => {
      console.error('Registration failed:', error); // Xử lý lỗi khi đăng ký thất bại
      if (error.response) {
        switch (error.response.status) {
          case 409:
            errorField.innerHTML = '<div class="error-message">Email hoặc tên người dùng đã tồn tại.</div>';
            break;
          default:
            errorField.innerHTML = '<div class="error-message">Đã xảy ra lỗi. Vui lòng thử lại sau.</div>';
        }
      } else {
        errorField.innerHTML = '<div class="error-message">Đã xảy ra lỗi. Vui lòng kiểm tra kết nối của bạn.</div>';
      }
      errorField.style.display = 'block';
  });
});
