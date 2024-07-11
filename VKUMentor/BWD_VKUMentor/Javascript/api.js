// ;(function () {
//   return new Promise((resolve) => {
//     if (window.axios) {
//       return resolve(window.axios);
//     }
//     var d = document, jqr, ref = d.getElementsByTagName('body')[0];
//     jqr = d.createElement('script');
//     jqr.async = true;
//     jqr.src = 'https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js';
//     jqr.onload = function() {
//       return resolve(window.axios);
//     };
//     ref.appendChild(jqr, ref);
//   })
// })()

/**
 * Define LienHeApi class
 */
class LienHeApi {
  static getLienHe(params = {}) {
    return axios.get("http://localhost:8000/api/lien-he", { params });
  }
}

class TaiLieuCongDongApi {
  static getAll() {
    return axios.get("http://127.0.0.1:8000/api/tailieucongdong");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  TaiLieuCongDongApi.getAll().then((res) => {
    let data = res.data.data;

    console.log(data);

    const testFillCard = document.querySelector(".card-container");
    console.log("testFillCard: ", testFillCard);

    
    let html = ""

    for(let item of data) {
      console.log("ThanhThao item: ", item);

      let arrDate = item["NgayTao"].split("T")

      console.log("ThanhThao arrDate: ", arrDate);


      html += `                 <div class="card">
                                    <img src="assets/img/${item.HinhAnh}" alt="Delicious Food">
                                    <div class="card-content">
                                        <h2>${item.TieuDe}</h2>
                                        <p>${item.NoiDung}</p>
                                        <div style="display: flex; align-items: center; flex-direction: row-reverse; justify-content: space-between; margin-top: 5px;">
                                          <a href="#">KinhNguyen <i class="fa-solid fa-user"></i></a>
                                          <span>${arrDate[0]}</span>
                                        </div>
                                    </div>
                                </div>
                                 
                                `
    }

    testFillCard.innerHTML = html
  });
});

/**
 * Listen click event on button with class "find" to call API
 */
document.querySelector("button.find").addEventListener("click", function (e) {
  e.preventDefault(); // prevent something like form submit
  e.target.disabled = true;
  LienHeApi.getLienHe()
    .then((res) => {
      console.log(res.data); // TODO: render data to view
    })
    .finally(() => {
      e.target.disabled = false;
    });
});

// NguoiDungapi class to handle login
class NguoiDungapi {
  static login(params) {
    return axios.post("http://127.0.0.1:8000/api/NguoiDung/login", params);
  }
}


// Event listener for the login form submission
// document.querySelector(".sign-in-form").addEventListener("submit", function (e) {
//   e.preventDefault(); // Prevent default form submission

//   // Get username and password from form inputs
//   const username = document.querySelector('.sign-in-form input[name="username"]').value;
//   const password = document.querySelector('.sign-in-form input[name="password"]').value;

//   console.log("username: ", username, " - password: ", password);

//   // Disable the button to prevent multiple clicks
//   // const loginButton = document.querySelector('.sign-in-form input[type="submit"]');
//   // loginButton.disabled = true;

//   // Send login request
//   // NguoiDungapi.login({ TenDangNhap: username, MatKhau: password })
//   //   .then((res) => {
//   //     if (res.status === 200 && res.data) {
//   //       console.log(res.data); // Log response data to console
//   //       alert("Đăng nhập thành công!");
//   //       // Redirect to index.html upon successful login
//   //       window.location.replace("./index.html");
//   //     } else {
//   //       alert("Đăng nhập thất bại!");
//   //     }
//   //   })
//   //   .catch((error) => {
//   //     console.error(error);
//   //     alert("Có lỗi xảy ra khi đăng nhập!");
//   //   })
//   //   .finally(() => {
//   //     // Enable the button after request completes
//   //     loginButton.disabled = false;
//   //   });
// });
//Login and Sign up
// login.js

// document.querySelector("#btnLogin").addEventListener("click", function (e) {
//   e.preventDefault();

//   const login = document.getElementById('txtUsername').value;
//   const password = document.getElementById('txtPassword').value;
//   const errorField = document.getElementById('loginError');

//   // Reset error field
//   errorField.style.display = 'none';
//   errorField.innerHTML = '';

//   if (!login || !password) {
//     errorField.innerHTML = '<div class="error-message">Please fill in all fields.</div>';
//     errorField.style.display = 'block';
//     return;
//   }

//   axios.post('http://localhost:8000/api/auth/login', {
//       Login: login,
//       MatKhau: password
//   })
//   .then((response) => {
//       localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
//       localStorage.setItem('user', JSON.stringify(response.data.user)); // Lưu thông tin user vào localStorage
//       window.location.href = './../../index.html'; // Chuyển hướng sau khi đăng nhập thành công
//   })
//   .catch((error) => {
//       console.error('Login failed:', error.response.data); // Xử lý lỗi khi đăng nhập thất bại
//       errorField.innerHTML = '<div class="error-message">Login failed. Please check your credentials.</div>';
//       errorField.style.display = 'block';
//   });
// });



// // Tương tự cho phần đăng ký
// document.querySelector("#btnRegister").addEventListener("click", function (e) {
//   e.preventDefault();

//   const login = document.getElementById('txtUsername').value;
//   const password = document.getElementById('txtPassword').value;
//   const confirmPassword = document.getElementById('txtConfirmPassword').value;
//   const errorField = document.getElementById('registerError');

//   // Reset error field
//   errorField.style.display = 'none';
//   errorField.innerHTML = '';

//   if (!login || !password || !confirmPassword) {
//     errorField.innerHTML = '<div class="error-message">Please fill in all fields.</div>';
//     errorField.style.display = 'block';
//     return;
//   }

//   if (password !== confirmPassword) {
//     errorField.innerHTML = '<div class="error-message">Passwords do not match.</div>';
//     errorField.style.display = 'block';
//     return;
//   }

//   axios.post('http://localhost:8000/api/auth/register', {
//       Login: login,
//       MatKhau: password
//   })
//   .then((response) => {
//       alert('Registration successful!');
//       window.location.href = './login.html'; // Chuyển hướng sau khi đăng ký thành công
//   })
//   .catch((error) => {
//       console.error('Registration failed:', error.response.data); // Xử lý lỗi khi đăng ký thất bại
//       errorField.innerHTML = '<div class="error-message">Registration failed. Please check your input.</div>';
//       errorField.style.display = 'block';
//   });
// });





//Menteeapi

class MenteeApi {
  static getAll() {
    return axios.get("http://127.0.0.1:8000/api/mentee");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  MenteeApi.getAll().then((res) => {
    let data = res.data.data;

    console.log(data);

    const testFillCard = document.querySelector(".box");
    console.log("testFillCard: ", testFillCard);

    
   let html = "";

for (let item of data) {
  let arrDate = item["NgayTao"].split("T");

  html += `
    <section>
      <img src="./assets/img/HDN.png" alt="Person Pointing" />
      <div class="box">
        <h1>Huỳnh Đức Nhật</h1>
        <p>Sinh viên khóa 23, 23IT2</p>

        <div class="content">
          <span>
            Tôi là Huỳnh Đức Nhật
          </span>
          <span>
            ${item.NoiDung}
          </span>
        </div>
        <div class="GPA">${item.DiemGPA}</div>
        <button class="button">Đăng ký học --></button>
      </div>
    </section>
  `;
}

testFillCard.innerHTML = html;

  });
});
