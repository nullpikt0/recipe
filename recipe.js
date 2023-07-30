//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); 
    req.open("get", "fdlist.csv", true); 
    req.send(null); 
    req.onload = function(){
    console.log('hi');
	convertCSVtoArray(req.responseText); 
    }
}

function convertCSVtoArray(str){ 
    let result = str.split(','); 
    for(let i=0; i<result.length; i++){
    result[i] = result[i].replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\s+/g, '').replace('∮', '').replace('☺', '').replace('✿', '').replace('♥', '').replace('❤️', '').replace('✨', '').replace('♦', '').replace('⭐', '').replace('❣', '').replace('♡', '').replace('♪', '').replace(/u3000+/g, '').replace(/"+/g, '').replace('☺', '').replace('♪','').replace('➁','').replace(/(\\|\/)/g,'');}
    let mended_result = result;
    mended_result.splice(18353, 1);
    console.log(mended_result.length)
    convertArraytoDict(mended_result);
}

function convertArraytoDict(list){
    let mended_dict = [];
    for(let i=0; i<(list.length)/2; i++){
        mended_dict[i] = [list[2*i], list[2*i+1]];
    }
    console.log(mended_dict.length);
    $('#btnSubmit').on('click', function(){
        document.getElementById("test1").innerHTML='';
        document.getElementById("test2").innerHTML='';
        document.getElementById("test3").innerHTML='';
        document.getElementById("test4").innerHTML='';
        document.getElementById("test5").innerHTML='';
        document.getElementById("test6").innerHTML='';
        let strURL = "https://www.google.com/transliterate?langpair=ja-Hira|ja&text=" + $('#txtZipCode').val();
        $.getJSON(strURL, function(strData){
            console.log(strData);
            document.getElementById("test1").insertAdjacentHTML("beforeend","<div id=test1sson>予測変換は" + strData + "でした</div>");
            let element = document.getElementById("test1sson");
            let text_lists = element.textContent.split(',');
        searchfromDict(text_lists ,mended_dict);
    });    
});
}

function searchfromDict(lists ,dict){
    let link_lists = [];
    for(let j=0; j<lists.length; j++){
        for(let i=0; i<dict.length; i++){
            if ((dict[i][1].indexOf(lists[j]) !=-1) && dict[i][0].indexOf('材料') ==-1) {
                link_lists.push(dict[i][0]);
            }
        }
    }
    let set_link_lists = Array.from(new Set(link_lists));
   document.getElementById("test2").insertAdjacentHTML("beforeend","<div>検索結果は " + set_link_lists.length + " 件でした</a></div>");
    for(let k=0; k<set_link_lists.length; k++){
        document.getElementById("test2").insertAdjacentHTML("beforeend","<div><a href= https://cookpad.com/search/" + set_link_lists[k] + ">" + set_link_lists[k] + "</a></div>");}    
    
    if(set_link_lists.length>20){ 
        $('#btnSubmitnum').on('click',function(){
            document.getElementById("test2").innerHTML='';
            let rand_link_lists = [];
            while(rand_link_lists.length<20){
                rand_link_lists.push(set_link_lists[Math.floor( Math.random() * (set_link_lists.length + 1))]);
                rand_link_lists = Array.from(new Set(rand_link_lists));}
                for(let k=0; k<20; k++){
                document.getElementById("test2").insertAdjacentHTML("beforeend","<div><a href= https://cookpad.com/search/" + rand_link_lists[k] + ">" + rand_link_lists[k] + "</a></div>");
            }})
    }
}

getCSV();



/*$('#btnSubmit').on('click', function(){
    var strURL = "https://www.google.com/transliterate?langpair=ja-Hira|ja&text=" + $('#txtZipCode').val();
    $.getJSON(strURL, function(strData){
        console.log(strData);
        document.getElementById("test1").insertAdjacentHTML("beforeend","<div id=test1sson>" + strData + "</div>");
        let element = document.getElementById("test1sson");
        let text_lists = element.textContent.split(',');
        let mended_dict = getCSV();
        searchfromDict(text_lists ,mended_dict);
    });
});document.getElementById("test2").insertAdjacentHTML("beforeend","<div><a href= https://cookpad.com/search/" + dict[i][0] + ">https://cookpad.com/search/" + dict[i][0] + "</a></div>");*/
