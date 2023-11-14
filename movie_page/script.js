
document.addEventListener('DOMContentLoaded', () => {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 60,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

    
    const urlParams = new URLSearchParams(window.location.search);
    const redirected = urlParams.get('redirected');
    const url = urlParams.get('url');
    const user_name=urlParams.get('name')
    const route = urlParams.get('route')
    if (route ==='Home') {
      showHomeContent()
    }
    else if (route === 'Movies'){
      showMoviesContent()
    }
    else if (route === 'Series'){
      showSeriesContent()
    }
    else if (route ==='Blog') {
      showBlogContent()
    }
    else if (route ==='List') {
      showlistContent()
    }
    const nav_content=document.getElementById("nav-content");
    if (redirected) {
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
        <hr class="line_break">
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
      nav_content.innerHTML += `<li> <a href ="/profile"><input  class="login" type="button" value="Login"></a></li>`
    }
    
    

    
    let timeout;

    let imgChange = (movie_name, imgUrl, vid_url, array_types) => {
      const video = document.getElementById("video")
      if (video) {
        video.remove()
      }
      
      const container = document.querySelector('.container')
      const stars = document.querySelector('.stars')
      stars.style.display = 'block'
      container.innerHTML =''
      array_types.forEach(element => {
        console.log(element)
        const genre = document.createElement('div');
        genre.classList.add('box');
        genre.textContent = element;
        container.appendChild(genre)
      });

      const url = `../assets/${imgUrl}`;
      console.log(url);

      const img = document.getElementById("hero")
      const gradient = 'linear-gradient(to right, rgba(14,18,26,255) 20%, rgba(17,23,29,255)40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100% )';
      img.style.backgroundImage = gradient + ', url(' + url + ')';
      img.style.overflow = 'hidden';
      img.style.backgroundRepeat = 'no-repeat';
      img.style.backgroundSize = 'cover';
      document.getElementById("movie-name").innerHTML = movie_name;

      const heroDiv = document.getElementById("hero")
      const vid = `<video autoplay muted play-inline class="back-video" id="video">
                      <source src="../assets/videos/${vid_url}" type ="video/mp4">
                  </video>`;

      timeout = setTimeout(() => {
        heroDiv.insertAdjacentHTML('afterbegin', vid);
        const video = document.getElementById("video");
        video.play();
        video.classList.add("animate-background");
      }, 1000); // Delay in milliseconds
      
    }

    let onMouseOut = (element) => {
      clearTimeout(timeout);
    }
    


    async function dynamic_movies() {
      try {
        const response = await axios.post('http://localhost:3000/movies');
        const parentElement = document.querySelector('.swiper-wrapper');

        response.data.movies.forEach(movie => {
          const newDiv = document.createElement('div');
          newDiv.classList.add('swiper-slide');
          newDiv.id = 'new-slide';

          newDiv.addEventListener('click', function() {
            movie_click(movie.movie_name)
          })
          
          
          const array_movies = movie.movie_pic.split(',');
          
       
          const styleElement = document.createElement('style');
          styleElement.textContent = `#new-slide:nth-child(${movie.id}) { background-image: url(\'../assets/${array_movies[1]}\'); background-size: cover; }`;
          document.head.appendChild(styleElement);
          const array_types = movie.movie_type.split(',');
          
          newDiv.addEventListener('mouseover', () => {
            
            imgChange(movie.movie_name, array_movies[0], movie.vid, array_types );
          });
    
          newDiv.addEventListener('mouseout', () => {
            
            onMouseOut(timeout);
          });
    
          parentElement.appendChild(newDiv);
        });
      } catch (error) {
        console.log(error);
      }
    }
    async function dynamic_series() {
      try {
        const response = await axios.post('http://localhost:3000/series');
        const parentElement = document.querySelector('.swiper-wrapper');

        response.data.series.forEach(series => {
          const newDiv = document.createElement('div');
          newDiv.classList.add('swiper-slide');
          newDiv.id = 'new-slide';

          newDiv.addEventListener('click', function() {
            series_click(series.series_name)
          })
    
          const array_series = series.series_pic.split(',');
       
          const styleElement = document.createElement('style');
          styleElement.textContent = `#new-slide:nth-child(${series.id}) { background-image: url(\'../assets/${array_series[1]}\'); background-size: cover; }`;
          document.head.appendChild(styleElement);
          const array_types = series.series_type.split(',');
    
          newDiv.addEventListener('mouseover', () => {
            imgChange(series.series_name, array_series[0], series.vid, array_types);
          });
    
          newDiv.addEventListener('mouseout', () => {
            onMouseOut(timeout);
          });
    
          parentElement.appendChild(newDiv);
        });
      } catch (error) {
        console.log(error);
      }
    }

    
    let redirect = () => {
      window.location.href="../Sign_up/login.html";
    }


    document.body.style.transition = 'opacity 0.5s ease';

    let movie_click = (name) => {
      console.log(name);

      document.body.style.opacity = 0;

      setTimeout(() => {
    
        window.location.href=`../description-page/index.html?name=${name}&redirected=${redirected}&user_name=${user_name}&url=${url}&type=movie`;
      }, 500); 
    };

    let series_click = (name) => {
      console.log(name);

      document.body.style.opacity = 0;

      setTimeout(() => {
    
        window.location.href=`../description-page/index.html?name=${name}&redirected=${redirected}&user_name=${user_name}&url=${url}&type=series`;
      }, 500); 
    };

    
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
      window.addEventListener("beforeunload", function() {
        swiper.destroy();
    });
      const video = document.getElementById("video")
      if (video) {
        video.remove()
      }
      const heroDiv = document.querySelector('#hero');
      const children = heroDiv.querySelectorAll(':scope > :not(:first-child)');
      children.forEach(child => child.remove());
      
      const contentDiv = document.querySelector('#hero');
      
      contentDiv.insertAdjacentHTML('beforeend',  `<div class="content">
      <h1 id="movie-name"></h1>
      <div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>
      <div class="container">
        
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <div #swiperRef="" class="swiper mySwiper">
      <div class="swiper-wrapper">
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>`);
    const stars = document.querySelector('.stars')
    stars.style.display = 'none'
      
    dynamic_movies()
    const swiper =new Swiper(".mySwiper", {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 60,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    swiper.update()
    }
    
    function showSeriesContent() {
      window.addEventListener("beforeunload", function() {
        swiper.destroy();
    });
      const hero = document.getElementById("hero")
      hero.style.backgroundImage ='none'
      const video = document.getElementById("video")
      if (video) {
        video.remove()
      }
      const heroDiv = document.querySelector('#hero');
      const children = heroDiv.querySelectorAll(':scope > :not(:first-child)');
      children.forEach(child => child.remove());

      const contentDiv = document.querySelector('#hero');
      contentDiv.insertAdjacentHTML('beforeend',  `<div class="content">
      <h1 id="movie-name"></h1>
      <div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>
      <div class="container">
       
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <div #swiperRef="" class="swiper mySwiper">
      <div class="swiper-wrapper">
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div> `);
    const stars = document.querySelector('.stars')
    stars.style.display = 'none'
    dynamic_series()
    const swiper =new Swiper(".mySwiper", {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 60,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    swiper.update()
    }
    
    function showlistContent() {
      window.addEventListener("beforeunload", function() {
        swiper.destroy();
    });
      const hero = document.getElementById("hero")
      hero.style.backgroundImage ='none'
      const video = document.getElementById("video")
      if (video) {
        video.remove()
      }
      const heroDiv = document.querySelector('#hero');
      const children = heroDiv.querySelectorAll(':scope > :not(:first-child)');
      children.forEach(child => child.remove());

      const contentDiv = document.querySelector('#hero');
      contentDiv.insertAdjacentHTML('beforeend',  `
      <main class="main-content">
    
      <div class="movies">
      </div>
      
    <link rel="stylesheet" href="../mylist-page/style.css">
    </main>`);
    show_liked()
    }

    function show_liked() {
      window.addEventListener("beforeunload", function() {
        swiper.destroy();
      });
    
      const movies = document.querySelector(".movies");
      console.log(movies);
    
      axios.post('http://localhost:3000/like', {
        user_name: user_name
      })
      .then((response) => {
        const liked_movies = response.data.movies_liked;
        const series_liked = response.data.series_liked;
        console.log(liked_movies  )
        console.log(series_liked)
        if (liked_movies.length > 0) {
          liked_movies.forEach((movie) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('show_card');
            newDiv.style.backgroundImage = `url(../assets/${movie.movie_pic.split(',')[0]})`;
            movies.appendChild(newDiv);
            newDiv.addEventListener('click', function() {
              movie_click(movie.movie_name);
            });
          });
        }
    
        if (series_liked.length > 0) {
          series_liked.forEach((series) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('show_card');
            newDiv.style.backgroundImage = `url(../assets/${series.series_pic.split(',')[0]})`;
            movies.appendChild(newDiv);
            newDiv.addEventListener('click', function() {
              series_click(series.series_name);
            });
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
    
    function showHomeContent() {
      window.addEventListener("beforeunload", function() {
        swiper.destroy();
    });
      const hero = document.getElementById("hero")
      hero.style.backgroundImage ='none'
      const video = document.getElementById("video")
      if (video) {
        video.remove()
      }
      const heroDiv = document.querySelector('#hero');
      const children = heroDiv.querySelectorAll(':scope > :not(:first-child)');
      children.forEach(child => child.remove());

      const contentDiv = document.querySelector('#hero');
      contentDiv.insertAdjacentHTML('beforeend', `<div class="body-content">
      <div>
      <div class="bigtext">Online Cinema</div> 
      <div class="half-screen">
          <p class="paragraph">Welcome to our website! Whether you're a fan of action-packed blockbusters or heartwarming dramas, we've got you covered. Sit back, relax, and enjoy the ultimate streaming experience with us.</p>
        </div>    
  
      <div class="button-container">
          <a href="#" class="button">Watch now</a>
      </div>
    </div>
    
    <link rel="stylesheet" href="../home-page/Style.css">
  <lottie-player  class="animation" src="https://assets5.lottiefiles.com/packages/lf20_qm8eqzse.json"  background="transparent"  speed="1"  loop  autoplay></lottie-player>
  </div>`);
  const Watchnow = document.querySelector('.button-container')
  Watchnow.addEventListener('click', function(){
      showMoviesContent()
  })
    }

    function redireccct() {
      showMoviesContent()
    }
    
    function showBlogContent() {
      window.addEventListener("beforeunload", function() {
        swiper.destroy();
    });
      const hero = document.getElementById("hero")
      hero.style.backgroundImage ='none'
      const video = document.getElementById("video")
      if (video) {
        video.remove()
      }
      const heroDiv = document.querySelector('#hero');
      const children = heroDiv.querySelectorAll(':scope > :not(:first-child)');
      children.forEach(child => child.remove());

      const contentDiv = document.querySelector('#hero');
      contentDiv.insertAdjacentHTML('beforeend', `
      <div class="blog-container">
      <!--box1-->
      <div class="blog-box">
         <div class="blog-img">
            <img src="https://www.radiofrance.fr/s3/cruiser-production/2019/10/796598e0-2d78-492d-9b08-ad2ec8188c2c/870x489_shrek-et-le-chat-potte-reviennent-bientot-au-cinema-big.jpg" alt="Blog">
         </div>
         <div class="blog-text">
            <span>24 April 2023</span>
            <a href="../blog-page/shrek.html" class="blog-title">How a chaotic project became a cultural reset.</a>
            <p>The idea that an ugly ogre could be a big-screen hero in a romantic comedy-fairy tale was not one many had high hopes for. The lack of a traditional prince wasn’t the only hurdle for “Shrek,” the next big animated production from the newly formed DreamWorks. Producers and directors came and went. A major role had to be recast. And technology was proving to be thorny. In fact, the project was initially unpopular among employees.</p>
            <a href="../blog-page/shrek.html" class="action">
               Find out more
               <span aria-hidden="true">
                 →
               </span>
             </a>
         </div>
      </div>
      <!--box2-->


      <div class="blog-box">
         <div class="blog-img">
            <img src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/12B94BA855A62BAD0B33230569EF97050344972D1C0F34713A29A35643E54081/scale?width=1200&aspectRatio=1.78&format=jpeg" alt="Blog">
         </div>
         <div class="blog-text">
            <span>24 April 2023</span>
            <a href="../blog-page/tangled.html" class="blog-title">Tangled: Surprising Secrets Revealed!</a>
            <p>It’s pretty funny that the first friends Rapunzel makes after leaving the tower are a group of ruffians and thugs. But their whole musical number was pretty awesome! And in the end, having these guys as friends ended up saving both Rapunzel and Eugene.</p>
            <a href="../blog-page/tangled.html" class="action">
               Find out more
               <span aria-hidden="true">
                 →
               </span>
             </a>
         </div>
      </div>
      <!--box3-->
      <div class="blog-box">
         <div class="blog-img">
            <img src="https://www.radiofrance.fr/s3/cruiser-production/2019/10/796598e0-2d78-492d-9b08-ad2ec8188c2c/870x489_shrek-et-le-chat-potte-reviennent-bientot-au-cinema-big.jpg" alt="Blog">
         </div>
         <div class="blog-text">
            <span>24 April 2023</span>
            <a href="../blog-page/shrek.html" class="blog-title">How a chaotic project became a cultural reset.</a>
            <p>The idea that an ugly ogre could be a big-screen hero in a romantic comedy-fairy tale was not one many had high hopes for. The lack of a traditional prince wasn’t the only hurdle for “Shrek,” the next big animated production from the newly formed DreamWorks. Producers and directors came and went. A major role had to be recast. And technology was proving to be thorny. In fact, the project was initially unpopular among employees.</p>
            <a href="../blog-page/shrek.html" class="action">
               Find out more
               <span aria-hidden="true">
                 →
               </span>
             </a>
         </div>
      </div>
    <link rel="stylesheet" href="../blog-page/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://boxicons.com/css/boxicons.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
`);

    }
    
