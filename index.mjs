const onClickAdd = () => {
    // テキストボックスの内容を取得し初期化
    const inputText=document.getElementById("add-text").value;
    document.getElementById("add-text").value= "";   
    // 未完了リストに追加
    createIncompleteTodo(inputText);
}

// 渡された引数を基に未完了のTODOを作成する
const createIncompleteTodo=(todo)=>{
        // li生成
        const li=document.createElement("li");

        // div生成
        const div=document.createElement("div");
        div.className="list-row";
    
        // p生成
        const p=document.createElement("p");
        p.className="todo-item";
        p.innerText=todo;
    
        // 完了ボタンタグ生成
        const completeButton=document.createElement("button");
        completeButton.innerText="完了";
        // 完了ボタンを押すと完了タグにタスクが移動する機能を付与
        completeButton.addEventListener("click",()=>{
            // 押された完了ボタンの親にあるliタグは以下の完了ボタンと削除ボタンを削除
                const moveTarget=completeButton.closest("li");
                // 完了ボタンの隣にある要素（削除ボタン）を削除
                completeButton.nextElementSibling.remove();
                completeButton.remove();
                // 戻すボタンを生成してdivタグ配下に追加
                const backButton= document.createElement("button");
                backButton.innerText="戻す";
                backButton.addEventListener("click",()=>{
                    // 戻るボタンの前にある要素（タスク名）を取得し未完了リストに追加
                    const todoText=backButton.previousElementSibling.innerText;
                    createIncompleteTodo(todoText);
                    // 押された戻すボタンの親のliタグを削除
                    backButton.closest("li").remove();
                })
                // liタグの最初の子要素（div）にアクセスし、ボタンを追加する
                moveTarget.firstElementChild.appendChild(backButton);
                // 完了リストに移動
                document.getElementById("complete-list").appendChild(moveTarget);
        })
    
        // 削除ボタンタグ生成
        const deleteButton=document.createElement("button");
        deleteButton.innerText="削除";
        deleteButton.addEventListener("click",()=>{
            // 押された削除ボタンの親にあるliタグを未完了リストから削除
            // 推したボタンから一番近いliタグを探す
            const deleteTarget=deleteButton.closest("li");
            document.getElementById("incomplete-list").removeChild(deleteTarget);
        })
    
        // liタグの子要素に各要素を設定
        div.appendChild(p);
        div.appendChild(completeButton);
        div.appendChild(deleteButton);
        li.appendChild(div);
    
        // 未完了リストに追加
        document.getElementById("incomplete-list").appendChild(li); 
    
}

document.getElementById("add-button").addEventListener("click",onClickAdd);