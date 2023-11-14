const urlParams = new URLSearchParams(window.location.search);
    const redirected = urlParams.get('redirected');
    let redirected_type 
    const movie_name = urlParams.get('name')
    const url = urlParams.get('url')
    const user_name = urlParams.get('user_name')
    const show_type = urlParams.get('type')

    console.log(movie_name)

    function load_movie() {
      axios.post('http://localhost:3000/description', {
        movie_name: movie_name
      })
      .then(function (response) {
        const movie = response.data.movies;
        console.log(movie);
    
        const movie_name_elem = document.getElementById('movie-name');
        const nb_stars_elem = document.getElementById('nb_stars');
        const duration_elem = document.querySelector('.duration');
        const movie_desc_elem = document.querySelector('.movie-description');
        const array_pics = movie.movie_pic.split(',');
        const url = `../assets/${array_pics[0]}`;
    
        const img_elem = document.getElementById("hero");
        const gradient = 'linear-gradient(to right, rgba(14,18,26,255) 20%, rgba(17,23,29,255)40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100% )';
        img_elem.style.backgroundImage = gradient + ', url(' + url + ')';
    
        movie_name_elem.innerHTML = movie.movie_name;
        nb_stars_elem.innerHTML = ` ${movie.number_of_stars}`;
        duration_elem.innerHTML = movie.movie_duration;
        movie_desc_elem.innerHTML = movie.movie_desc;
    
        const array_types = movie.movie_type.split(',');
        console.log(array_types)
        const movie_info = document.querySelector('.movie-info')
        array_types.forEach(element => {
          console.log(element)
          const genre = document.createElement('div');
          genre.classList.add('genre');
          genre.textContent = element;
          movie_info.appendChild(genre)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function load_series() {
      axios.post('http://localhost:3000/description-series', {
        series_name: movie_name
      })
      .then(function (response) {
        const series = response.data.series;
    
        const series_name_elem = document.getElementById('movie-name');
        const nb_stars_elem = document.getElementById('nb_stars');
        const duration_elem = document.querySelector('.duration');
        const series_desc_elem = document.querySelector('.movie-description');
        const array_pics = series.series_pic.split(',');
        const url = `../assets/${array_pics[0]}`;
    
        const img_elem = document.getElementById("hero");
        const gradient = 'linear-gradient(to right, rgba(14,18,26,255) 20%, rgba(17,23,29,255)40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100% )';
        img_elem.style.backgroundImage = gradient + ', url(' + url + ')';
    
        series_name_elem.innerHTML = series.series_name;
        nb_stars_elem.innerHTML = ` ${series.number_of_stars}`;
        duration_elem.innerHTML = `SS ${series.seasons}`;
        series_desc_elem.innerHTML = series.series_desc;
    
        const array_types = series.series_type.split(',');
        console.log(array_types)
        const series_info = document.querySelector('.movie-info')
        array_types.forEach(element => {
          console.log(element)
          const genre = document.createElement('div');
          genre.classList.add('genre');
          genre.textContent = element;
          series_info.appendChild(genre)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    if (show_type ==='movie') {
      const like_button = document.querySelector('.l-button')
      load_movie()
      comments()
      write_comment()
      like_button.addEventListener('click', function() {
        alert(" movie liked")
        movie_liked()
      })


    }
    else {
      const like_button = document.querySelector('.l-button')
      load_series()
      series_comments()
      series_write_comment()
      like_button.addEventListener('click', function() {
        alert(" series liked")
        series_liked()
      })
    }


    const nav_content=document.getElementById("nav-content");
    console.log(redirected)
    console.log(redirected !== null)
    if (redirected !== 'null') {
      redirected_type = true
      nav_content.innerHTML += `<li>
      <div class="avatar-dropdown">
      <img src="../assets/profilepics/${url}" alt="Avatar" class="avatar" id="avatarr">
      <a href="#" class="user-name">${user_name}</a>
      <img src="../assets/icons/down.png" class="down-arrow">
      <div class="dropdown-menu">
        <div class="dropdown-item">
        <img class="icon" src="../assets/icons/account.png">
        <a href="#">Account</a>
        </div>
        <div class="dropdown-item">
        <img class="icon" src="../assets/icons/settings.png">
        <a href="#">Settings</a>
        </div>
        <hr class="line_breakv2">
        <div class="dropdown-item">
        <img class="icon" src="../assets/icons/logout.png">
        <a href="#" onclick="redirect()">Log out</a>
        </div>
      </div>
    </div>
    </li>
    `
     
      const avatarDropdown = document.querySelector('.avatar-dropdown');
      const dropdownMenu = avatarDropdown.querySelector('.dropdown-menu');

      avatarDropdown.addEventListener('click', function() {
      dropdownMenu.classList.toggle('show');
      });

      document.addEventListener('click', function(event) {
      if (!avatarDropdown.contains(event.target)) {
      dropdownMenu.classList.remove('show');
      }
      });

    } else {
      
      redirected_type = false
      const text_field = document.querySelector('.comment-type')
      text_field.style.display ='none'
      nav_content.innerHTML += `<li> <button id="loginButton" onclick="redirect()">Sign In</button> </li>`
    }
    
    let redirect = () => {
      window.location.href="../Sign_up/login.html";
    }

    
    let icon = (name) => {
      const buttonIcon = document.querySelector('.button-icon');
      buttonIcon.src = `../assets/icons/${name}.png`
    }

    let icon_2 =(name) => {
      const buttonIcon = document.querySelector('.button-icon1');
      buttonIcon.src = `../assets/icons/${name}.png`
    }

    function comments() {
      const comment_pic = document.querySelector('.Profile')  
      comment_pic.src = `../assets/profilepics/${url}`
      axios.post('http://localhost:3000/comments', {
        movie_name: movie_name
      })
      .then((response) => {
        const res = response.data.message
        const number_comments = document.querySelector('.comment-number')
        number_comments.textContent = `${res.length} Comment(s)`
        const comment_section = document.querySelector('.comment-section')
        console.log(comment_section)
        if (res !== 'no comments' ) {
          res.forEach (comment => {
          const commentt = comment.Movie_comment
          const likes = comment.likes
          const dislikes = comment.dislikes
          const profile_pic =comment.profile_pic
          const customer_name = comment.Customer_name
            const newComment = document.createElement("div");
            newComment.className = "comment-type";
            const now = new Date();
            const commentDate = comment.sent_at;
            const timeSinceComment = getTimeSinceComment(now, commentDate);

            newComment.innerHTML = `
              <img src="../assets/profilepics/${profile_pic}" alt="Avatar" class="Profile">
              <div class="user-info">
                <div class="name">${customer_name}</div>
                <div class="since">${timeSinceComment}</div>
                <div class="comment">${commentt}</div>
                <div class="like_dislike">
                  <button onclick="likeComment()">
                    <img src="../assets/icons/like.png" alt="like">
                    <div id="like-count"> ${likes}</div>
                  </button>
                  <button class="dislike_button" onclick="dislikeComment()">
                    <img class="dislike_icon" src="../assets/icons/dislike.png" alt="like">
                    <div id="dislike-count"> ${dislikes}</div>
                  </button> 
                </div>
              </div>
            `;
            comment_section.appendChild(newComment);
          
          
          console.log(commentt, likes, dislikes, profile_pic, customer_name)

        })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

    function series_comments() {
      const comment_pic = document.querySelector('.Profile')  
      comment_pic.src = `../assets/profilepics/${url}`
      axios.post('http://localhost:3000/series-comments', {
        series_name: movie_name
      })
      .then((response) => {
        const res = response.data.message
        const number_comments = document.querySelector('.comment-number')
        number_comments.textContent = `${res.length} Comment(s)`
        const comment_section = document.querySelector('.comment-section')
        console.log(comment_section)
        if (res !== 'no comments' ) {
          res.forEach (comment => {
          const commentt = comment.series_comment
          const likes = comment.likes
          const dislikes = comment.dislikes
          const profile_pic =comment.profile_pic
          const customer_name = comment.Customer_name
            const newComment = document.createElement("div");
            newComment.className = "comment-type";
            const now = new Date();
            const commentDate = comment.sent_at;
            const timeSinceComment = getTimeSinceComment(now, commentDate);

            newComment.innerHTML = `
              <img src="../assets/profilepics/${profile_pic}" alt="Avatar" class="Profile">
              <div class="user-info">
                <div class="name">${customer_name}</div>
                <div class="since">${timeSinceComment}</div>
                <div class="comment">${commentt}</div>
                <div class="like_dislike">
                  <button onclick="likeComment()">
                    <img src="../assets/icons/like.png" alt="like">
                    <div id="like-count"> ${likes}</div>
                  </button>
                  <button class="dislike_button" onclick="dislikeComment()">
                    <img class="dislike_icon" src="../assets/icons/dislike.png" alt="like">
                    <div id="dislike-count"> ${dislikes}</div>
                  </button> 
                </div>
              </div>
            `;
            comment_section.appendChild(newComment);
          
          
          console.log(commentt, likes, dislikes, profile_pic, customer_name)

        })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    

    async function write_comment() {
      const sendCommentInput = document.querySelector('.send_comment');
      const commentSection = document.querySelector('.comment-section');
      const commentNumber = document.querySelector('.comment-number');
    
      sendCommentInput.addEventListener('keydown', async function(event) {
        if (event.key === 'Enter') {
          const commentText = event.target.value;
          try {
            const response = await axios.post('http://localhost:3000/write_comments', {
              movie_name: movie_name,
              user_name: user_name,
              comment: commentText
            });
            // Create a new comment element and add it to the DOM
            const newComment = document.createElement('div');
            newComment.classList.add('comment-type');
    
            // Calculate the time since the comment was posted
            const now = new Date();
            const commentDate = response.data.date;
            console.log(response)
            const timeSinceComment = getTimeSinceComment(now, commentDate);
    
            newComment.innerHTML = `
              <img src="../assets/profilepics/${url}" alt="Avatar" class="Profile">
              <div class="user-info">
                <div class="name">${user_name}</div>
                <div class="since">${timeSinceComment}</div>
                <div class="comment">${commentText}</div>
                <div class="like_dislike">
                  <button  onclick="likeComment()">
                  <img src="../assets/icons/like.png" alt="like">
                    <div id="like-count">0</div>
                  </button>
                  <button class="dislike_button" onclick="dislikeComment()">
                    <img class="dislike_icon" src="../assets/icons/dislike.png" alt="dislike">
                    <div id="dislike-count">0</div>
                  </button>
                </div>
              </div>
            `;
            commentSection.appendChild(newComment);
            const currentCommentNumber = parseInt(commentNumber.textContent);
            commentNumber.textContent = `${currentCommentNumber + 1} Comment(s)`;
            
          }
          catch(err) {
            console.log(err);
          }
          event.target.value = ''; // Clear the input field after submitting the comment
        }
      });
    }

    async function series_write_comment() {
      const sendCommentInput = document.querySelector('.send_comment');
      const commentSection = document.querySelector('.comment-section');
      const commentNumber = document.querySelector('.comment-number');
    
      sendCommentInput.addEventListener('keydown', async function(event) {
        if (event.key === 'Enter') {
          const commentText = event.target.value;
          try {
            const response = await axios.post('http://localhost:3000/series_write_comments', {
              series_name: movie_name,
              user_name: user_name,
              comment: commentText
            });
            // Create a new comment element and add it to the DOM
            const newComment = document.createElement('div');
            newComment.classList.add('comment-type');
    
            // Calculate the time since the comment was posted
            const now = new Date();
            const commentDate = response.data.date;
            console.log(response)
            const timeSinceComment = getTimeSinceComment(now, commentDate);
    
            newComment.innerHTML = `
              <img src="../assets/profilepics/${url}" alt="Avatar" class="Profile">
              <div class="user-info">
                <div class="name">${user_name}</div>
                <div class="since">${timeSinceComment}</div>
                <div class="comment">${commentText}</div>
                <div class="like_dislike">
                  <button  onclick="likeComment()">
                  <img src="../assets/icons/like.png" alt="like">
                    <div id="like-count">0</div>
                  </button>
                  <button class="dislike_button" onclick="dislikeComment()">
                    <img class="dislike_icon" src="../assets/icons/dislike.png" alt="dislike">
                    <div id="dislike-count">0</div>
                  </button>
                </div>
              </div>
            `;
            commentSection.appendChild(newComment);
            const currentCommentNumber = parseInt(commentNumber.textContent);
            commentNumber.textContent = `${currentCommentNumber + 1} Comment(s)`;
            
          }
          catch(err) {
            console.log(err);
          }
          event.target.value = ''; // Clear the input field after submitting the comment
        }
      });
    }

    function movie_liked() {
      axios.post('http://localhost:3000/movies_mylist', {
        movies_name : movie_name,
        customer_name : user_name
      })
      .then((response) => {
        console.log(response)
      }) 
      .catch((err) => {
        console.log(err)
      })
    }

    function series_liked() {
      axios.post('http://localhost:3000/series_mylist', {
        series_name : movie_name,
        customer_name : user_name
      })
      .then((response) => {
        console.log(response)
      }) 
      .catch((err) => {
        console.log(err)
      })
    }

    const homeLink = document.querySelector('#nav-content a[href="#home"]');
    const seriesLink = document.querySelector('#nav-content a[href="#series"]');
    const moviesLink = document.querySelector('#nav-content a[href="#movies"]');
    const my_listLink = document.querySelector('#nav-content a[href="#My_List"]');
    const blogLink = document.querySelector('#nav-content a[href="#blog"]');

    homeLink.addEventListener('click', showHomeContent);
    seriesLink.addEventListener('click', showSeriesContent);
    moviesLink.addEventListener('click', showMoviesContent);
    my_listLink.addEventListener('click', showlistContent);
    blogLink.addEventListener('click', showBlogContent);

    

    function showMoviesContent() {
      if (redirected_type == false) {
        window.location.href="../movie_page/index.html?route=Movies"
      }
      else {
      window.location.href="../movie_page/index.html?redirected=true&url="+url+"&name="+user_name+"&route=Movies";
      }
    }

    function showHomeContent() {
      console.log(redirected_type)
      if (redirected_type == false) {
        window.location.href="../movie_page/index.html?route=Home"
      }
      else {
      window.location.href="../movie_page/index.html?redirected=true&url="+url+"&name="+user_name+"&route=Home";
      }
      
    }

    function showBlogContent() {
      if (redirected_type == false) {
        window.location.href="../movie_page/index.html?route=Blog"
      }
      else {
      window.location.href="../movie_page/index.html?redirected=true&url="+url+"&name="+user_name+"&route=Blog";
      }          
        }
    function showSeriesContent() {
      if (redirected_type == false) {
        window.location.href="../movie_page/index.html?route=Series"
      }
      else {
      window.location.href="../movie_page/index.html?redirected=true&url="+url+"&name="+user_name+"&route=Series";
      }    
    }
    function showlistContent() {
      if (redirected_type == false) {
        window.location.href="../movie_page/index.html?route=List"
      }
      else {
      window.location.href="../movie_page/index.html?redirected=true&url="+url+"&name="+user_name+"&route=List";
      }    
    }
    
    function getTimeSinceComment(currentTime, commentTime) {
      const diffInSeconds = Math.floor((currentTime - new Date(commentTime)) / 1000);
      console.log(diffInSeconds)
      if (diffInSeconds < 60) {
        return `${diffInSeconds} second(s) ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute(s) ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour(s) ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day(s) ago`;
      }
    }