$(document).ready(function() {
    
    function ckSign() {
        let isSign = localStorage.getItem("userName");
        if(isSign) {
            return true;
        } else {
            return false;
        }
    }

    function printWelcom() {
        let isSign = ckSign()
        if(isSign) {
            $("section.user").stop().fadeOut(800);
            $(".Loggin").css("display","block");
            $(".notLoggin").css("display","none");
        } else {
            $(".Loggin").css("display","none");
            $(".notLoggin").css("display","block");
        }
    }
    
    function printTodo() {
        let userTodo = localStorage.getItem("userTodo") || new Array;
        let todoStatus = localStorage.getItem("todoStatus") || new Array;

        if(userTodo.length){
            userTodo = userTodo.split(",");
            todoStatus = todoStatus.split(",");
        }

        $(".user-list").children().remove();
        // userTodo[i]
        userTodo.forEach(function(keyword, i) {
            let isCheck = JSON.parse(todoStatus[i]);
            isCheck ? isCheck = "checked" : "";

            let list = `
                <li>
                    <div class="content">${keyword}</div>
                    <div class="util">
                        <input name="done" ${isCheck} id="done${i}" type="checkbox"/>
                        <label class="ck" for="done${i}"></label>
                        <button class="edit"><span class="material-symbols-outlined">edit_square</span></button>
                        <button class="delete"><span class="material-symbols-outlined">delete</span></button>
                    </div>
                </li
            `

            $(".user-list").append(list);
        });
    }

    function setTodoStatus() {
        let todoStatus = localStorage.getItem("todoStatus") || new Array;

        if(todoStatus.length){
            todoStatus = todoStatus.split(",");
        }
        
        todoStatus.push(false);
        localStorage.setItem("todoStatus", todoStatus);
    }

    function setUserTodo(item) {
        let userTodo = localStorage.getItem("userTodo") || new Array;
        

        if(userTodo.length){
            userTodo = userTodo.split(",");
        }
    
        userTodo.push(item);
        
        localStorage.setItem("userTodo", userTodo);
    }

    function deleteList(idx) {
        let userTodo = localStorage.getItem("userTodo").split(",");
        let todoStatus = localStorage.getItem("todoStatus").split(",");
        
        userTodo.splice(idx, 1);
        todoStatus.splice(idx, 1);

        localStorage.setItem("userTodo",userTodo);
        localStorage.setItem("todoStatus",todoStatus);
        $(".user-list li").eq(idx).remove();
    }

    function editTodoList(idx, edited) {
        let userTodo = localStorage.getItem("userTodo").split(",");
        userTodo.splice(idx, 1, edited);
        localStorage.setItem("userTodo", userTodo);
        printTodo();
    }
    
    $("#userName").on("submit", function(e) {
        e.preventDefault();
        let userInput = $("#userName input").val();
        localStorage.setItem("userName", userInput);
        ckSign();
    });
    
    $("#userTodo").on("submit", function(e) {
        e.preventDefault();
        let userInput = $("#userTodo input").val();
        $("#userTodo input").val("");

        setUserTodo(userInput);
        setTodoStatus();
        printTodo();
    }); 

    $(document).on("click", ".edit", function() {
        let formEdit = `
            <form action="" id="editTodo">
                <input required placeholder="edit" type="text"/>
            </form>
        `;
        $(this).parents(".user-list li").find(".content").html(formEdit);
        $(this).parents(".user-list li").find("#editTodo input").focus();
    });

    $(document).on("submit", "#editTodo", function(e) {
        e.preventDefault();
        let idx = $(this).parents(".user-list li").index();
        let editInput = $(this).find("input").val();
        editTodoList(idx, editInput);
    });

    $(document).on("click", ".delete",function() {
        let i = $(this).parents(".user-list li").index();
        deleteList(i);
    });

    $(document).on("change", ".user-list .util input", function() {
        let todoStatus = localStorage.getItem("todoStatus").split(",");
        let checked = $(this).is(":checked");//true or false
        let i = $(this).parents(".user-list li").index();          
        // let changedStat = JSON.parse(todoStatus[i]);
        // changedStat = !changedStat
        todoStatus.splice(i, 1, checked);
        localStorage.setItem("todoStatus",todoStatus)
    });

    // 1. 체크 된 리스트의 상태를 저장
    //  $(선택자).is(":checked") -> true / false
    //  $(선택자).val() -> true / false
    // 2. 리스트의 상태가 항상 유지
    
    function init() {
        printWelcom();
        printTodo();
    }

    init();

    
});