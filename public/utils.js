const hideButtons = document.querySelectorAll(".show-hide");
const content = document.querySelectorAll(".topic-content");

for (let hideButton in hideButtons) {
    hideButtons[hideButton].addEventListener("click", function(){
        if(hideButtons[hideButton].innerHTML === "ESCONDER"){
            content[hideButton].classList.add('hide')
            hideButtons[hideButton].innerHTML = "MOSTRAR";
            
        }else if (hideButtons[hideButton].innerHTML === "MOSTRAR"){
            content[hideButton].classList.remove('hide')
            hideButtons[hideButton].innerHTML = "ESCONDER";
        }
    });
};