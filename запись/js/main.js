document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Функция для анимации разлетания при скролле
    function handleScrollAnimation() {
        const scrollPosition = window.scrollY;
        const triggerPoint = 0;
        
        if (scrollPosition > triggerPoint) {
            photoItems.forEach(item => {
                item.classList.add('scroll-animate');
            });
        } else {
            photoItems.forEach(item => {
                item.classList.remove('scroll-animate');
            });
        }
    }
    
    // Обработчики событий
    window.addEventListener('scroll', handleScrollAnimation);
    

});





// function([string1, string2],target id,[color1,color2])    
 consoleText(['клиентской базы', 'уведомлений', 'аналитики'], 'text',['black','black','black']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)

}